import React, { useState } from "react";
import { Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/config/GoogleAIModel";

export default function GenerateAITemplate({ setGenerateAIOutput }) {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const generateFromAI = async () => {
    setLoading(true);
    try {
      const PROMPT = "Generate template for editor.js in JSON for " + userInput;
      const result = await chatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      console.log(responseText);
      const output = JSON.parse(responseText);
      setGenerateAIOutput(output);
      setOpen(false);
    } catch (error) {
      console.error("Error generating AI template:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button className="flex items-center gap-2" onClick={() => setOpen(true)}>
        <Bot className="h-4 w-4" /> Generate AI
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate AI Template</DialogTitle>
            <DialogDescription>
              <div className="space-y-4">
                <div>
                  <h2 className="text-sm font-medium leading-none mt-3">
                    Write your Prompt
                  </h2>
                  <Input
                    className="mt-1.5"
                    placeholder="Ex. Project Idea"
                    value={userInput}
                    onChange={(event) => setUserInput(event.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={generateFromAI}
                    disabled={!userInput || loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate"
                    )}
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
