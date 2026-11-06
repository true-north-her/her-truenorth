import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Compass, Share2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";

import { Button } from "@/components/ui/button";
import { trueNorthLinks } from "@/lib/truenorth-links";
import { getCommunityRecommendations } from "@/lib/community-recommendations.functions";

const examples = [
  "Honest conversations",
  "Meeting women like me",
  "Sharing what I know",
];

export function CommunityRecommender() {
  const [hopes, setHopes] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<"copied" | "shared" | "error" | "">("");
  const recommend = useServerFn(getCommunityRecommendations);

  const handleShare = async () => {
    setShareFeedback("");
    const shareText = `${recommendations}\n\nExplore TrueNorth: ${window.location.origin}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "My TrueNorth starting point", text: shareText });
        setShareFeedback("shared");
        return;
      } catch (shareError) {
        if (shareError instanceof DOMException && shareError.name === "AbortError") return;
      }
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareText);
      } else {
        throw new Error("Clipboard API unavailable");
      }
      setShareFeedback("copied");
    } catch {
      try {
        const temporaryInput = document.createElement("textarea");
        temporaryInput.value = shareText;
        temporaryInput.setAttribute("readonly", "");
        temporaryInput.style.position = "fixed";
        temporaryInput.style.opacity = "0";
        document.body.appendChild(temporaryInput);
        temporaryInput.select();
        const copied = document.execCommand("copy");
        temporaryInput.remove();
        setShareFeedback(copied ? "copied" : "error");
      } catch {
        setShareFeedback("error");
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setRecommendations("");
    setShareFeedback("");
    setPending(true);

    try {
      const result = await recommend({ data: { hopes } });
      if (result.ok) setRecommendations(result.recommendations);
      else setError(result.error);
    } catch {
      setError("We couldn’t prepare recommendations just now. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <section id="find-your-place" className="community-guide-section px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[.8fr_1.2fr] md:items-start md:gap-20">
        <div className="community-guide-intro">
          <p className="community-guide-eyebrow"><Compass className="size-4" aria-hidden="true" /> A place to begin</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.08] sm:text-5xl">What are you hoping to find?</h2>
          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
            A little about what you’re looking for helps us point you toward a TrueNorth activity that might feel right.
          </p>
          <p className="community-guide-privacy mt-5">Your note is used to make this suggestion and isn’t saved.</p>
        </div>

        <div className="community-guide-form-wrap">
          <form onSubmit={handleSubmit} aria-busy={pending}>
            <label className="community-guide-label" htmlFor="community-hopes">
              What would you like a women’s community to make space for?
            </label>
            <textarea
              id="community-hopes"
              name="hopes"
              className="community-guide-input mt-3"
              value={hopes}
              onChange={(event) => setHopes(event.target.value)}
              placeholder="For example, I’d love honest conversations and a few women I can learn alongside…"
              minLength={12}
              maxLength={1200}
              required
              rows={5}
              aria-describedby="community-hopes-help community-hopes-count"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p id="community-hopes-help" className="community-guide-hint">A few words is enough. Share only what feels comfortable.</p>
              <span id="community-hopes-count" className="community-guide-count" aria-live="off">{hopes.length}/1,200</span>
            </div>
            <div className="community-guide-examples mt-5" aria-label="Example hopes">
              {examples.map((example) => (
                <Button
                  key={example}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="community-guide-example"
                  onClick={() => setHopes(`I’m hoping for ${example.toLowerCase()} in a women’s community.`)}
                >
                  {example}
                </Button>
              ))}
            </div>
            <Button type="submit" size="lg" className="community-guide-submit mt-7" disabled={pending || hopes.trim().length < 12}>
              {pending ? "Finding your starting point…" : "Find my starting point"}
              {!pending && <ArrowRight className="size-4" aria-hidden="true" />}
            </Button>
          </form>

          <div className="community-guide-result" aria-live="polite" aria-atomic="true">
            {pending && <p className="community-guide-pending">Thinking about what might suit you…</p>}
            {error && <p className="community-guide-error" role="alert">{error}</p>}
            {recommendations && (
              <div className="community-guide-answer">
                <p className="community-guide-answer-label">A thoughtful place to start</p>
                {recommendations.split(/\n+/).map((line, index) => (
                  <p key={`${index}-${line}`} className="community-guide-answer-line">{line}</p>
                ))}
                <div className="community-guide-actions">
                  <Button asChild size="sm">
                    <a href={trueNorthLinks.substack} target="_blank" rel="noreferrer">Read TrueNorth on Substack <ArrowRight className="size-4" aria-hidden="true" /></a>
                  </Button>
                  <Button asChild size="sm" variant="ghost">
                    <a href="#newsletter">Get Letters from TrueNorth</a>
                  </Button>
                  <Button type="button" size="sm" variant="outline" onClick={handleShare}>
                    {shareFeedback === "copied" ? <Check className="size-4" aria-hidden="true" /> : <Share2 className="size-4" aria-hidden="true" />}
                    {shareFeedback === "copied" ? "Copied" : shareFeedback === "shared" ? "Shared" : "Share or copy"}
                  </Button>
                </div>
                {shareFeedback && (
                  <p className="community-guide-share-status" role="status">
                    {shareFeedback === "copied" ? "Recommendation copied to your clipboard." : shareFeedback === "shared" ? "Recommendation shared." : "Couldn’t copy just now. Please try again."}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}