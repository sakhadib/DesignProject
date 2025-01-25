<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('submissions', function (Blueprint $table) {
            $table->unsignedBigInteger('contest_id')->after('problem_id')->nullable(); // Add contest_id column after problem_id
            $table->foreign('contest_id')->references('id')->on('contests')->onDelete('cascade'); // Add foreign key constraint
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('submissions', function (Blueprint $table) {
            $table->dropForeign(['contest_id']); // Drop foreign key constraint
            $table->dropColumn('contest_id'); // Drop contest_id column
        });
    }
};
