<?php

namespace App\Services;

use Aws\Credentials\Credentials;
use Aws\S3\S3Client;


class AwsService
{
    private string $accessKey;
    private string $secretKey;
    private S3Client $client;

    public function __construct()
    {
        $this->accessKey = env('AWS_ACCESS_KEY_ID');
        $this->secretKey = env('AWS_SECRET_ACCESS_KEY');

        $this->init();
    }

    protected function init(): void
    {
        $credentials = new Credentials(
            $this->accessKey,
            $this->secretKey
        );

        $this->client = new S3Client([
            'version' => 'latest',
            'region'  => env('AWS_DEFAULT_REGION', 'auto'),
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => true,
            'credentials' => $credentials,
        ]);
    }

    public function client(): S3Client
    {
        $this->init();
        return $this->client;
    }
}