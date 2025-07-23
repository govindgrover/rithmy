
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [title, setTitle] = useState("Legal Information");

    useEffect(() => {
        if (pathname.includes("privacy")) setTitle("Privacy Policy");
        else if (pathname.includes("terms")) setTitle("Terms of Service");
        else if (pathname.includes("attributions")) setTitle("Attributions");
        else setTitle("Legal Information");
    }, [pathname]);


    return (
        <main className="h-dvh w-screen p-4 sm:p-8 flex items-center justify-center bg-background/80 backdrop-blur-sm fixed inset-0 z-50">
            <Card className="w-full max-w-3xl shadow-2xl flex flex-col h-full sm:h-auto sm:max-h-[85vh]">
                <CardHeader className="flex flex-row items-center gap-4 border-b">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/">
                            <ArrowLeft />
                            <span className="sr-only">Back</span>
                        </Link>
                    </Button>
                    <CardTitle className="font-headline text-2xl">{title}</CardTitle>
                </CardHeader>
                <CardContent className="py-6 flex-grow overflow-y-auto">
                    {children}
                </CardContent>
            </Card>
        </main>
    );
}
