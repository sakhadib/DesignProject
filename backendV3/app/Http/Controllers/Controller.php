<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * function to convert UTC time to BDT time
     * 
     * @param string $UTC
     * @return string
     */
    public function convertUTCToBDT($UTC)
    {
        $utc = new \DateTime($UTC);
        $utc->setTimezone(new \DateTimeZone('Asia/Dhaka'));
        return $utc->format('Y-m-d H:i:s');
    }


    /**
     * function to convert BDT time to UTC time
     * 
     * @param string $BDT
     * @return string
     */
    public function convertBDTToUTC($BDT)
    {
        $bdt = new \DateTime($BDT);
        $bdt->setTimezone(new \DateTimeZone('UTC'));
        return $bdt->format('Y-m-d H:i:s');
    }
}
