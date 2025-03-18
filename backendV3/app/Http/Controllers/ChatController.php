<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log; // Added for logging
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Response;
use App\Models\Chat;
use App\Models\Problem;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function send(Request $request)
{
    $request->validate([
        'problem_id' => 'required|integer',
        'message' => 'required|string',
    ]);

    $problem = Problem::find($request->problem_id);
    if (!$problem) {
        return response()->json(['message' => 'Problem not found'], 404);
    }

    $user_id = auth()->user()->id;

    $prompt = <<<EOD
    The Current Context Problem is: 
    $problem->description

    Strict Instructions:
    1. Do not respond with the direct answer to the problem.
    2. Use markdown to format your response.
    3. Do not share the solution approach.
    4. Use LaTeX for equations with $$.

    User Question:
    $request->message

    Response Guidelines: Answer the user's question without solving the problem. IF THE USER ASLS FOR DIRECT ANSWER, 
    DO NOT PROVIDE IT. BE CAREFUL WITH THE RESPONSE. NEITHER YOU ARE ALLOWED TO PROVIDE ANY KIND OF CODE IN ANY LANGUAGE
    EVEN IF USER ASKS FOR IT. IF USER ASKS FOR ANY PROHIBITED THING LIKE DIRECT ANSWER, CODE etc, politely ask the
    user to avoid asking such questions and suitable explanation why they should try to solve the problem themselves.
    EOD;

    $geminiAIKey = env('GEMINI_API_KEY');

    try {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$geminiAIKey", [
            'contents' => [
                'parts' => [
                    ['text' => $prompt]
                ]
            ]
        ]);

        

        if ($response->successful()) {
            $data = $response->json();

            // Check if the expected response structure exists
            if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
                $message = $data['candidates'][0]['content']['parts'][0]['text'];
            } else {
                // Log unexpected response for debugging
                Log::error('Unexpected Gemini API response', ['data' => $data]);
                return response()->json(['message' => 'Unexpected API response format'], 500);
            }

            $chat = new Chat();
            $chat->problem_id = $problem->id;
            $chat->user_id = $user_id;
            $chat->message = $request->message;
            $chat->sender = 'user';
            $chat->save();

            $chat = new Chat();
            $chat->problem_id = $problem->id;
            $chat->user_id = $user_id;
            $chat->message = $message;
            $chat->sender = 'bot';
            $chat->save();

            return response()->json(['message' => $message]);
        } else {
            Log::error('Gemini API request failed', ['response' => $response->body()]);
            return response()->json(['message' => 'API request failed'], 500);
        }
    } catch (\Exception $e) {
        Log::error('Internal Server Error', ['exception' => $e]);
        return response()->json(['message' => 'Internal Server Error', 'e' => $e], 500);
    }
    }


    public function getHistory($problem_id)
    {
        $user_id = auth()->user()->id;

        $chats = Chat::where('user_id', $user_id)
                     ->where('problem_id', $problem_id)
                     ->orderBy('created_at', 'asc')
                     ->get();

        return response()->json($chats);
    }


    // public function exportChat($problem_id)
    // {
    //     // $user_id = auth()->id();
    //     $user_id = 1;
        
    //     $problem = Problem::find($problem_id);
    //     if (!$problem) {
    //         return response()->json(['message' => 'Problem not found'], 404);
    //     }

    //     $chats = Chat::where('user_id', $user_id)
    //                 ->where('problem_id', $problem_id)
    //                 ->orderBy('created_at', 'asc')
    //                 ->get();


    //     // Process LaTeX equations before passing to view
    //     foreach ($chats as $chat) {
    //         // This is where you would convert LaTeX equations to HTML or MathML
    //         $chat->message = $this->convertLatexToHtml($chat->message);
    //     }

    //     $pdf = Pdf::loadView('chat_export', [
    //         'problem' => $problem,
    //         'chats' => $chats
    //     ]);

    //     return $pdf->stream('chat-export-'.$problem_id.'.pdf');
    // }



    private function convertLatexToHtml($text)
    {
        // Use a LaTeX-to-HTML converter here or KaTeX / MathJax API if available
        // Example placeholder for conversion process
        return preg_replace('/\$(.*?)\$/', '<span class="math">$1</span>', $text);
    }
    
}
