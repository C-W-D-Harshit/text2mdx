"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, Copy, Trash2, Upload, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { convertTextToMDX } from "@/actions/convert";

export default function Text2MDXConverter() {
  const [inputText, setInputText] = useState("");
  const [outputMdx, setOutputMdx] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const content = e.target?.result;
          if (typeof content === "string") {
            setInputText(content);
          }
        };
        reader.readAsText(file);
      }
    },
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputText(e.target.value);
      setShowOutput(false);
    },
    []
  );

  const handleConvert = useCallback(async () => {
    if (inputText.trim() === "") {
      toast.error("Please enter some text before converting.", {
        description: "The input field cannot be empty.",
      });
      return;
    }

    setIsLoading(true);
    setShowOutput(false);

    const response = await convertTextToMDX({ text: inputText });
    if (response.error) {
      setIsLoading(false);
      toast.error("Conversion failed", {
        description: "There was an error converting the text to MDX.",
      });
      return;
    }
    setOutputMdx(response.mdxContent as string);
    setIsLoading(false);
    setShowOutput(true);
    toast.success("Conversion complete", {
      description: "Your text has been converted to MDX format.",
    });
  }, [inputText]);

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(outputMdx)
      .then(() => {
        toast.success("Copied!", {
          description: "The MDX content has been copied to your clipboard.",
        });
      })
      .catch(() => {
        toast.error("Copy failed", {
          description: "There was an error copying the text. Please try again.",
        });
      });
  }, [outputMdx]);

  const handleClear = useCallback(() => {
    setInputText("");
    setOutputMdx("");
    setShowOutput(false);
    toast.info("Cleared", {
      description: "Input and output have been cleared.",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <motion.h1
          className="text-5xl font-extrabold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          Text2MDX
        </motion.h1>
        <motion.p
          className="text-center text-gray-400 mb-8 text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Transform your text into MDX with the power of AI
        </motion.p>
        <Card className="bg-gray-800 border-gray-700 shadow-xl overflow-hidden">
          <CardHeader className="border-b border-gray-700">
            <CardTitle className="text-2xl font-bold text-center text-gray-100">
              Convert Your Text
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              Paste your text, upload a file, or start typing to begin
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label
                htmlFor="input-text"
                className="block text-sm font-medium text-gray-300"
              >
                Input Text
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClear}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-200"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
                <div>
                  <input
                    type="file"
                    id="file-upload"
                    className="sr-only"
                    accept=".txt,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-700 hover:bg-gray-600 text-gray-200"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload File
                    </Button>
                  </label>
                </div>
              </div>
              <Textarea
                id="input-text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter or paste your text here..."
                className="min-h-[200px] resize-none bg-gray-700 text-gray-100 placeholder-gray-500 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleConvert}
                disabled={isLoading || inputText.trim() === ""}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Convert to MDX
                  </>
                )}
              </Button>
            </motion.div>
            <AnimatePresence>
              {showOutput && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="output-mdx"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Output MDX
                    </label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      disabled={!outputMdx}
                      className="bg-gray-700 hover:bg-gray-600 text-gray-200"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy MDX
                    </Button>
                  </div>
                  <Textarea
                    id="output-mdx"
                    value={outputMdx}
                    readOnly
                    className="min-h-[200px] resize-none bg-gray-700 text-gray-100 placeholder-gray-500 border-gray-600"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
