"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

export default function PrivacyPolicy() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const policies = [
    {
      title: "Data Handling",
      content:
        "Text2MDX does not collect or store any personal information. When you provide text for conversion, it is temporarily processed by our AI, and once the conversion is done, no data is retained. We do not store, analyze, or share the text you submit.",
    },
    {
      title: "Security",
      content:
        "We use secure methods to process your data during the conversion process. Once the conversion is complete, all data is discarded, ensuring your content is not stored or reused.",
    },
    {
      title: "Cookies and Tracking",
      content:
        "Text2MDX uses minimal cookies for essential website functionality only. We do not use cookies to track your behavior, and no personal information is collected.",
    },
    {
      title: "Changes to This Policy",
      content:
        "We may update this Privacy Policy from time to time. Any updates will be posted on this page with the updated date. Continued use of the service implies acceptance of the latest version.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about this Privacy Policy, please contact us at privacy@text2mdx.com.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-4xl font-extrabold ml-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Text2MDX Privacy Policy
          </h1>
        </div>

        <Card className="bg-gray-800 border-gray-700 shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-100">
              Our Approach to Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p>
              Text2MDX respects your privacy. We do not collect, store, or share
              any personal information. The text you provide is used solely for
              conversion purposes by our AI, and once the process is complete,
              all data is discarded.
            </p>
            <p className="mt-4">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Accordion type="single" collapsible className="space-y-4">
          {policies.map((policy, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-gray-800 border border-gray-700 rounded-lg"
            >
              <AccordionTrigger className="px-4 py-2 text-gray-100 hover:bg-gray-700">
                {policy.title}
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2 text-gray-300">
                {policy.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <footer className="mt-12 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Text2MDX. All rights reserved.</p>
        </footer>
      </motion.div>
    </div>
  );
}
