"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X, Zap, Rocket } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for individuals and small projects.",
    features: [
      "Up to 3 team members",
      "5GB storage",
      "Basic analytics",
      "Community support",
      "Limited API access",
    ],
    icon: Zap,
  },
  {
    name: "Pro",
    price: "$5",
    description: "Ideal for growing businesses and advanced projects.",
    features: [
      "Unlimited team members",
      "50GB storage",
      "Advanced analytics",
      "24/7 priority support",
      "Full API access",
      "Custom integrations",
    ],
    icon: Rocket,
  },
];

export default function PricingDialog() {
  return (
    <DialogContent className="sm:max-w-[900px] max-h-[90vh] bg-background p-0 overflow-hidden">
      <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogClose>
      <DialogHeader className="px-6 pt-6">
        <DialogTitle className="text-3xl font-bold">
          Choose Your Plan
        </DialogTitle>
        <DialogDescription>
          Start for free, upgrade when you're ready.
        </DialogDescription>
      </DialogHeader>
      <div className="px-6 pb-6 overflow-auto max-h-[calc(90vh-100px)]">
        <div className="w-full max-w-screen-xl mx-auto py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`flex flex-col ${
                  plan.name === "Pro" ? "border-primary" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-2 ${
                        plan.name === "Pro" ? "bg-primary" : "bg-secondary"
                      } rounded-full`}
                    >
                      <plan.icon className="w-5 h-5 text-background" />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                      {plan.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-extrabold">
                      {plan.price}
                    </span>
                    <span className="ml-1 text-xl text-muted-foreground">
                      /month
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {plan.description}
                  </p>
                  <ul className="space-y-3 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 flex-shrink-0 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.name === "Pro" ? "default" : "outline"}
                  >
                    {plan.name === "Free" ? "Get Started" : "Upgrade Now"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Need a custom solution?{" "}
              <a
                href="#"
                className="text-primary hover:underline font-semibold"
              >
                Contact our sales team
              </a>
            </p>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
