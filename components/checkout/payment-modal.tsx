'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useState, useEffect } from 'react'
import { PaymentForm } from './payment-form'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { RewardsApiClient } from '@/lib/api-client'
import { storage } from '@/lib/storage'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
}

export function PaymentModal({ isOpen, onClose, amount }: PaymentModalProps) {
  const router = useRouter()
  const [clientSecret, setClientSecret] = useState<string>()
  const [loading, setLoading] = useState(false)

  const apiClient = new RewardsApiClient('apikey');

  useEffect(() => {
    async function createPaymentIntent() {
      if (!isOpen) return
      setLoading(true)

      try {
        const response = await fetch('/api/checkout/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount }),
        })

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (error) {
        console.error('Payment failed:', error)
        onClose()
      } finally {
        setLoading(false)
      }
    }

    createPaymentIntent()
  }, [isOpen, amount, onClose])

  const appliedRewardPoints = Number(storage.get('appliedRewardPoints')) || 0

  const handlePaymentSuccess = async () => {

    const redeemPointsRes = await apiClient.redeemPoints({
      "apiKey": "sk_test_4eC39HqLyjWDarjtT1zdp7dc",
      "secretKey": "sk_secret_Qlkfd8dfsdfs23fsdfs2323fsdf3",
      "brandName": "LLOYD",
      "totalPoints": (appliedRewardPoints),
      "consumerId": storage.get('consumerId') || '',
    })

    const txnId = redeemPointsRes.id;
    storage.set('txnId', txnId);

    console.log(redeemPointsRes, 'result')

    router.push('/checkout/success')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        {loading ? (
          <div className="flex items-center justify-center p-6">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm amount={amount} onSuccess={handlePaymentSuccess} />
          </Elements>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}