---
title: 'VS Code High Memory Usage and The Fix'
date: '2021/03/01'
tags: ['tech']
summary: 'Are you using VS Code and seeing high memory usage from something called "Code Helper (Renderer)"? Find out how to get rid of this issue.'
---

TLDR: Remove unnecessary VS Code extensions. Chrome extensions too.

## Problem

I recently ran into an issue where my 2018 Macbook Pro (2.2 GHz 6-Core Intel Core i7, 16 GB 2400 MHz DDR4) was running very slow while I was writing code and viewing changes locally in Chrome. I saw the issue occur when I opened up Chrome DevTools and wanted to edit styles or inspect an element; my browser would freeze up for a few seconds. PAIN.

## Investigation

The first thing I did was look at Activity Monitor to figure out what was going on with my machine. I first checked the CPU tab and nothing looked out of the ordinary: my CPU idle was about hovering around low to mid 90s. Next was the Memory tab and to my surprise I was using 15.00 GB of 16.00 GB of memory. Yes, you read that right. VS Code, a couple Chrome tabs and DevTools, iTerm, Messages, and Finder were using up almost 95% of memory.

The process that was taking up the most memory was "Code Helper (Renderer)" and it was using 1.3 GB of memory alone. The next biggest item on the list was Chrome at around 400 MB which more or less is expected. I examined the list further and saw multiple instances of "Code Helper (Renderer)" as well as "Google Chrome Helperer (Renderer)".

I googled "Code Helper (Renderer)" and found [this](https://github.com/microsoft/vscode/issues/98168) as the first link. This person was having issues with "Code Helper (Renderer)" eating 100% of his CPU. I read the thread but found nothing that helped me. I then went through several other search results but did not find anything useful until I came across this Reddit [post](https://www.reddit.com/r/vscode/comments/8arcd9/code_helper_process_100_cpu_usage/).

## Solution

In the post, /u/chrisgaraffa suggests finding the PID of the offending Code Helper (Renderer) by going to Activity Monitor.

Then run `ps aux | grep {PID}`, replacing `{PID}` with the PID you found (get rid of the curly braces too). Once you see an output, you should see what plugin is causing the isuse.

For me, I found several so I decided to nuke any extension that I was not using. After I deleted those extensions and restarted VS Code, my memory usage went down to below 10.00 GB.

Thanks /u/chrisgaraffa!
