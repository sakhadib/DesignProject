### User Model

```
<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }


    /**
     * Returns boolean value if user is admin
     * 
     * @return bool
     */
    public function isAdmin()
    {
        $admin = Admin::where('user_id', $this->id)->first();
        return $admin ? true : false;
    }


    /**
     * Make user an admin
     */
    public function makeAdmin(){
        Admin::create([
            'user_id' => $this->id
        ]);

    }



    public function problem(){
        return $this->hasMany(Problem::class)
                    ->where('status', 'published');
    }


    public function blog(){
        return $this->hasMany(Blog::class)
                    ->withCount(['votes', 'comments', 'upVotes']);
    }

    public function shortBlog(){
        return $this->hasMany(Blog::class)
                    ->select(['id', 'user_id', 'title', 'created_at', 'category'])
                    ->withCount(['votes', 'comments', 'upVotes'])
                    ->orderBy('created_at', 'desc');
    }


    public function submission(){
        return $this->hasMany(Submission::class)
                    ->with('problem:id,title,xp')
                    ->select(['id', 'user_id', 'problem_id','contest_id', 'xp', 'penalty', 'created_at']);
    }


    public function participatedContest(){
        return $this->hasMany(ContestParticipant::class)->with('contest:id,title');
    }
}
```


### Submission Model
> One user Can Have Many Submissions for a problem. Only get the submissions that has contest_id and of max xp and if same xp then of min penalty.
```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'problem_id',
        'contest_id',
        'answer',
        'xp',
        'penalty'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function problem()
    {
        return $this->belongsTo(Problem::class);
    }

    public function contest()
    {
        return $this->belongsTo(Contest::class);
    }

    public function assignXP($xp)
    {
        $this->xp = $xp;
        $this->save();
    }

    public function assignPenalty($penalty)
    {
        $this->penalty = $penalty;
        $this->save();
    }

    
}
```

### Rating Model
> For each contest there will be a rating change recorded for each user. if the user have not participated in the contest then no rating change will be recorded. For the first time when user regiseres to the site then the rating table will insert the user's id with rating_change 1500 (initial rating). Here contest ID will be NULL but user_id will be present. For any other record of the user other than the first record, the contest_id will be present.
```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'contest_id',
        'rating_change',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function contest()
    {
        return $this->belongsTo(Contest::class);
    }
}
```


### ContestParticipant Model
> For each contest there will be a record of the user who participated in the contest. The contest_id and user_id will be present in the record.
```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContestParticipant extends Model
{
    use HasFactory;

    protected $fillable = [
        'contest_id',
        'user_id',
    ];

    public function contest()
    {
        return $this->belongsTo(Contest::class)->withCount(['participants', 'problems']);
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```



## The Required ELO Rating System

To devise an algorithm for updating user ratings after a math contest using an Elo-inspired system, follow these steps:

### *Algorithm Overview*
1. *Calculate Performance Metrics*:
   - *Total XP*: Sum of XP awarded for each solved problem.
   - *Total Penalty*: Sum of time (in minutes) taken to solve each problem.

2. *Rank Users*:
   - Primary key: Total XP (higher is better).
   - Tiebreaker: Total Penalty (lower is better).

3. *Update Ratings*:
   - For each user, compute their *expected score* against every other user using Elo's formula.
   - Compute their *actual score* based on contest results.
   - Adjust their rating using the difference between actual and expected scores, scaled by a factor \( K \).

---

### *Step-by-Step Algorithm*
1. *Calculate Total XP and Penalty*:
   - For each user, sum the XP and penalties from all solved problems.

2. *Rank Users*:
   - Sort users by:
     - Descending Total XP.
     - Ascending Total Penalty (if XP is tied).

3. *Compute Rating Adjustments*:
   For each user \( A \):
   - *Expected Score (E_A)*:
     \[
     E_A = \sum_{B \neq A} \frac{1}{1 + 10^{(R_B - R_A)/400}}
     \]
     (Sum of probabilities that \( A \) beats each other user \( B \), based on pre-contest ratings \( R_A, R_B \).)
   - *Actual Score (S_A)*:
     - For each \( B \neq A \):
       - \( S_{AB} = 1 \) if \( A \) outperforms \( B \).
       - \( S_{AB} = 0.5 \) if tied.
       - \( S_{AB} = 0 \) otherwise.
     - \( S_A = \sum_{B \neq A} S_{AB} \).
   - *Rating Change*:
     \[
     \Delta R_A = \frac{K}{N-1} \times (S_A - E_A)
     \]
     - \( K \): Constant (e.g., 32).
     - \( N \): Total number of users.

4. *Update Ratings*:
   \[
   R_{\text{new}} = R_{\text{old}} + \Delta R_A
   \]

---

### *Example*
#### *Contest Setup*
- *Users*:
  - Alice (Pre-Rating: 1200)
  - Bob (Pre-Rating: 1000)
  - Charlie (Pre-Rating: 800)
- *Results*:
  - Alice: 500 XP, Penalty = 60.
  - Bob: 600 XP, Penalty = 50.
  - Charlie: 500 XP, Penalty = 70.

#### *Step 1: Rank Users*
1. Bob (600 XP, 50 penalty)
2. Alice (500 XP, 60 penalty)
3. Charlie (500 XP, 70 penalty)

#### *Step 2: Compute Expected Scores*
For *Alice* (Ra = 1200):
- *vs Bob* (Rb = 1000):
  \[
  E_{\text{Alice vs Bob}} = \frac{1}{1 + 10^{(1000 - 1200)/400}} = \frac{1}{1 + 10^{-0.5}} \approx 0.76
  \]
- *vs Charlie* (Rc = 800):
  \[
  E_{\text{Alice vs Charlie}} = \frac{1}{1 + 10^{(800 - 1200)/400}} = \frac{1}{1 + 10^{-1}} \approx 0.91
  \]
- *Total Expected*: \( 0.76 + 0.91 = 1.67 \).

For *Bob* (Rb = 1000):
- *vs Alice*: \( E = 0.24 \).
- *vs Charlie*: \( E = 0.76 \).
- *Total Expected*: \( 0.24 + 0.76 = 1.0 \).

For *Charlie* (Rc = 800):
- *vs Alice*: \( E = 0.09 \).
- *vs Bob*: \( E = 0.24 \).
- *Total Expected*: \( 0.33 \).

#### *Step 3: Compute Actual Scores*
- *Alice: Loses to Bob (0), beats Charlie (1). **Actual = 1*.
- *Bob: Beats Alice (1), beats Charlie (1). **Actual = 2*.
- *Charlie: Loses to Alice (0), loses to Bob (0). **Actual = 0*.

#### *Step 4: Calculate Rating Changes*
- \( K = 32 \), \( N = 3 \), so \( \frac{K}{N-1} = 16 \).
- *Alice*:
  \[
  \Delta R = 16 \times (1 - 1.67) \approx -10.7 \quad \Rightarrow \quad \text{New Rating} = 1200 - 10.7 \approx 1189
  \]
- *Bob*:
  \[
  \Delta R = 16 \times (2 - 1.0) = 16 \quad \Rightarrow \quad \text{New Rating} = 1000 + 16 = 1016
  \]
- *Charlie*:
  \[
  \Delta R = 16 \times (0 - 0.33) \approx -5.3 \quad \Rightarrow \quad \text{New Rating} = 800 - 5.3 \approx 795
  \]

---

### *Key Notes*
- *Penalty*: Used only for tiebreakers (lower penalty = better).
- *K Value*: Controls rating volatility. Use \( K = 32 \) for moderate adjustments.
- *Ties*: Users split points (0.5 each) if XP and penalty are identical.

This system rewards users who outperform expectations and penalizes those who underperform, similar to Elo in chess.

---