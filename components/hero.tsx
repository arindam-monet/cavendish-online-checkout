import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
    return (
        <div className="bg-pink-50 pt-12 pb-24">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-block px-4 py-1 bg-[#67004D] text-white rounded-full">
                            LIFE INSURANCE
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                            {`We're committed to providing our lowest possible premiums`}
                        </h1>
                        <p className="text-lg text-gray-600">
                            When you buy online, we aim to achieve these low premiums by
                            charging a small, fixed fee of £25 or a reduced commission.
                        </p>
                        <Button
                            className="bg-[#67004D] hover:bg-[#4D0039] text-white px-8"
                            size="lg"
                        >
                            More details →
                        </Button>

                        {/* Trustpilot Widget */}
                        <div className="pt-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-[#67004D] font-semibold">Excellent</span>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-5 h-5 text-green-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-gray-600">2855 reviews on</span>
                                <Image
                                    src="/images/trustpilot.svg"
                                    alt="Trustpilot"
                                    className="h-6"
                                    width={60}
                                    height={25}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[400px] lg:h-[500px]">
                        <Image
                            src="/images/couple.png"
                            alt="Happy couple illustration"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
