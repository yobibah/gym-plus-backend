<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Validation\Rules\Email;

class demandeDemo extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $email;
    public $message;
    
    public function __construct(Email $email,string $message)
    {
        $this->email=$email;
        $this->message=$message;
    
    }

    public function build(){
        return $this->subject('Demande de demonstration de l\'application ')->with([
            'message'=>$this->message
        ])->view('emails.demo');
    }

}
