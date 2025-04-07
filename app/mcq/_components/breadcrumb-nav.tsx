"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useQuizlet } from "../_lib/quizlet-context";

interface Crumb {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbNavProps {
  showBackButton?: boolean;
  quizTitle?: string;
}

export function BreadcrumbNav({
  showBackButton = true,
  quizTitle,
}: BreadcrumbNavProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const { getQuiz } = useQuizlet();

  // Build breadcrumb data
  const breadcrumbs: Crumb[] = [];

  // MCQ base crumb (as home)
  breadcrumbs.push({
    label: "MCQ",
    href: "/mcq",
  });

  // Add dynamic breadcrumbs based on route segments
  if (segments.length > 1) {
    const quizId = segments[1];
    let title = quizTitle;

    // If no title provided, try to get it from the quiz data
    if (!title && quizId) {
      const quiz = getQuiz(quizId);
      title = quiz?.title;
    }

    // Quiz page with dynamic title
    breadcrumbs.push({
      label: title || "Quiz",
      href: `/mcq/${quizId}`,
    });

    // Additional path segments
    if (segments.length > 2) {
      if (segments[2] === "edit") {
        breadcrumbs.push({
          label: "Edit",
          href: `/mcq/${quizId}/edit`,
          active: true,
        });
      } else if (segments[2] === "practice") {
        breadcrumbs.push({
          label: "Practice",
          href: `/mcq/${quizId}/practice`,
          active: true,
        });
      } else if (segments[2] === "quiz") {
        breadcrumbs.push({
          label: "Take Quiz",
          href: `/mcq/${quizId}/quiz`,
          active: true,
        });
      }
    }
  }

  return (
    <div className="flex items-center mb-6">
      {showBackButton && breadcrumbs.length > 1 && (
        <Link
          href={breadcrumbs[breadcrumbs.length - 2].href}
          className="mr-3 flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Go back</span>
        </Link>
      )}

      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {crumb.active ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
