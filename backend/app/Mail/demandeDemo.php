<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;


class demandeDemo extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $email;
    public $mess;
    
    public function __construct($email, $message)
    {
        $this->email=$email;
        $this->mess=$message;
    
    }

    public function build(){
        return $this->subject('Demande de demonstration de l\'application ')->with([
            'content'=>$this->mess,
            'email'=>$this->email
        ])->view('emails.demo');
    }

}
