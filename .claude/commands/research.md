---
description: "Source gathering, verification, and organization before writing begins. Use when asked to research, fact-check, find sources, verify, or when preparing material for a longer piece."
---
The default failure of AI research is confident invention. A plausible-sounding citation with the wrong journal, the wrong year, or a quote nobody ever said. Treat every claim as unverified until you have confirmed it against a primary source. If you cannot confirm it, mark it explicitly in the draft. The reader can decide what to do with an uncertainty marker. You cannot decide for them by presenting invention as fact.

Use a three-level confidence system. "[verified]" means you confirmed the claim against a primary source: the original paper, the official dataset, the author's own text, the actual documentation page. "[partial]" means you found it in two or more secondary sources that agree, or you confirmed two of three key details but not the third. "[unverified]" means you have one source or none, or the claim comes from memory with no confirmation. These markers travel with the claim into the drafting phase and only get removed when the surrounding prose makes the confidence level clear on its own.

Different source types have different verification rules. Identify which type you're dealing with before you start searching.

For academic and scientific claims, verify the author, the publication, and the year. Getting two out of three right is still wrong. Check recency: a 2003 finding in a settled area (thermodynamics, foundational statistics) probably still holds. A 2003 finding in a fast-moving area (machine learning, immunology, social media effects) may have been superseded, contradicted, or retracted. Search for replications and retractions when citing older work in active fields.

For technical claims (APIs, libraries, system behavior, configuration options), the primary source is the current documentation or the actual codebase. A Stack Overflow answer from 2019 describing how an API works is a secondary source that may be outdated. Version numbers matter. "This works in Python 3.8" is a different claim than "this works in Python." When something changed between versions, say when. If you can't determine the current behavior, mark it "[unverified]" and note the version your source refers to.

For business and market claims (company size, revenue, pricing, product capabilities), treat the company's own statements as marketing until cross-referenced against independent reporting, SEC filings, or public datasets. A company's "About" page saying they serve "millions of customers" is not a verified claim. An S-1 filing reporting 2.3 million paying accounts as of Q3 2024 is. When the only source is the company itself, say so.

For historical and journalistic claims (events, timelines, public statements, policy changes), primary sources are documents, transcripts, and contemporaneous reporting. A 2024 book describing a 1998 event is a secondary source that may compress, reinterpret, or dramatize. When possible, find the original reporting or the original document. When a claim about what someone said comes only from a later account, note the distance.

Quotes require exact wording. If you cannot find the exact text, paraphrase and say you are paraphrasing. "Coase argued that firms exist because markets have transaction costs" is honest. A fabricated direct quote with quotation marks around words Coase never arranged in that order is not. Many widely-cited quotes are composites, compressed by secondary sources into a single sentence that the original author never actually said. When you find this, report it.

Search in expanding rings. Start with the specific claim: the name, the key phrase, the date. If that fails, broaden to the field and the concept. If that fails, check whether the claim is a misattribution or a paraphrase that drifted from its source.

When synthesizing across multiple sources that partially overlap and partially contradict, map the agreements and disagreements explicitly. Where do three sources agree? Where does one source say something the others don't mention? Where do two sources directly contradict each other? The synthesis is the map of these relationships, not a blended summary that papers over the contradictions. If source A says the market is $4B and source B says $6.2B, report both numbers and note the discrepancy. Do not average them. Do not pick the one that fits the argument better.

Distinguish primary from secondary sources in every domain. A meta-analysis and a blog post summarizing it carry different weight. A changelog and a tutorial describing the changelog carry different weight. When your evidence for a claim comes from someone else's summary, say so and try to get to the original. If you can't reach the original, mark the claim "[partial]."

Organize raw material by argument, not by source. The question is "what claims does this piece need to make and what supports each one," not "what did Source A say, then Source B." A source-by-source dump is a bibliography pretending to be research.

Flag what's missing. If you searched for evidence supporting a claim and found nothing, that is a finding. Report it. The strength of the evidence matters as much as its direction. When the evidence contradicts the working thesis, lead with the contradiction. Do not bury it after three paragraphs of support.

Know when to stop. For a short piece, three to five solid sources per major claim is enough. For a long piece, aim for at least one primary source per section. Stop when additional searching returns the same sources you already have or only weaker versions of evidence already collected. Flag the gaps and move to drafting.

For longer pieces, output the research as an annotated outline: each section's main claim, the sources supporting it (with confidence markers and source type), the sources complicating it, and any gaps marked "[needs source]" or "[single study]" or "[unverified]". This outline becomes the input for the /draft skill.
