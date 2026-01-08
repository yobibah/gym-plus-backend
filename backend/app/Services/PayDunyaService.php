<?php

namespace App\Services;

use Paydunya\Setup;
use Paydunya\Checkout\CheckoutInvoice;
use Paydunya\Checkout\Store;
class PayDunyaService
{
public function __construct()
{
    Setup::setMasterKey(config('paydunya.master_key'));
    Setup::setPrivateKey(config('paydunya.private_key'));
    Setup::setPublicKey(config('paydunya.public_key'));
    Setup::setToken(config('paydunya.token'));

    Setup::setMode('live'); 

    Store::setName("GymPlus");
    Store::setTagline("Paiement sécurisé");
    Store::setPhoneNumber("+22670000000");
    Store::setPostalAddress("Ouagadougou, Burkina Faso");
    Store::setWebsiteUrl(config('app.url'));
}


    /**
     * Créer une facture PayDunya
     */
    public function createInvoice(array $data): CheckoutInvoice
    {
        $invoice = new CheckoutInvoice();

        // Ajout d’items 'name' => 'Abonnement a GymPlus',
                   
        foreach ($data['items'] as $item) {
            $invoice->addItem(
                $item['name'],
                1,
                $item['montant'],
                $item['montant'],
                $item['forfait'] ?? ""
            );
        }

        $invoice->setTotalAmount($data['total_amount']);
        $invoice->setDescription($data['description']);

        if (!empty($data['custom_data'])) {
            foreach ($data['custom_data'] as $key => $value) {
                $invoice->addCustomData($key, $value);
            }
        }

        // URLs (obligatoire)
        $invoice->setCancelUrl($data['cancel_url']);
        $invoice->setReturnUrl($data['return_url']);
        $invoice->setCallbackUrl($data['callback_url']);

        return $invoice;
    }

    /**
     * Redirection vers la page de paiement
     */
public function payAndRedirect(CheckoutInvoice $invoice): array
{
    if ($invoice->create()) {
        return [
            'success' => true,
            'payment_url' => $invoice->getInvoiceUrl()
        ];
    }

    return [
        'success' => false,
        'message' => $invoice->response_text
    ];
}


    /**
     * Vérifier le statut du paiement (confirmation)
     */
    public function confirmPayment(string $token)
    {
        $invoice = new CheckoutInvoice();

        if ($invoice->confirm($token)) {
            return [
                'status' => $invoice->getStatus(),
                'total_amount' => $invoice->getTotalAmount(),
                'receipt_url' => $invoice->getReceiptUrl(),
                'customer' => [
                    'name'  => $invoice->getCustomerInfo('name'),
                    'email' => $invoice->getCustomerInfo('email'),
                    'phone' => $invoice->getCustomerInfo('phone'),
                ],
               
                
            ];
        }

        return [
            'error' => true,
            'message' => $invoice->response_text
        ];
    }
}
