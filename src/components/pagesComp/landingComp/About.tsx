import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ABOUT_SECTION } from "@/utils/constants/about.contants";

const About = () => {
  return (
    <section id="about" className="container mx-auto px-4 py-16 md:py-24">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">
          {ABOUT_SECTION.TITLE}
        </h2>
        <p className="mt-3 text-muted-foreground">
          {ABOUT_SECTION.DESCRIPTION}
        </p>
      </div>

      {/* Features */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {ABOUT_SECTION.FEATURES.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {feature.content}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 flex justify-center">
        <Button asChild size="lg">
          <a href={`mailto:${ABOUT_SECTION.CTA.EMAIL}`}>
            {ABOUT_SECTION.CTA.LABEL}
          </a>
        </Button>
      </div>
    </section>
  );
};

export default About;