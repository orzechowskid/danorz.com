import express from 'express';

import {
  ensureSignedIn
} from './utils';

const router = express();

/* require auth on all private routes */
router.use(ensureSignedIn);


router.get(
  `*`,
  function noop(req, res) {
    const response = {
      data: [{"_id":"5e80e46a825e6800048bea84","tags":["programming","jobs","interviewing"],"text":"It's perhaps not super surprising that I got laid off earlier this month; global pandemics play hell on the travel industry, go figure.  It's weird to be the interviewee after 3+ years of interviewing frontend devs of all experience levels (and not interviewing anywhere at all myself during that period - I was happy where I was!).  And one of the things I'm learning is that most places have such godawful interview practices it's a wonder anybody actually works there.\n\n(and I have a whole aside, not super relevant here, about how a lot of that is due to new grads having crushing student-loan debt and tons of economic anxiety and companies being eager to provide a WE'RE FUN WE PLAY HARD AND PLEASE STAY AT THE OFFICE TIL 10PM office culture and it all combines to make companies feel like they have the power to grind applicants into the ground.)\n\nIt seems insane to me to conduct an interview any way other than one which mimics to the greatest extent possible the actual working conditions of the position. How are you going to be able to tell that a candidate is someone you'd want on the team and not just someone who has memorized a bunch of algorithms but can't code their way out of a wet paper bag?  When I ran frontend interviews at Wanderu the process went something like:\n\n- check out their Github/etc. presence, to see what kinds of code they write and what kinds of things they like to work on; then\n- hold a ~30-minute pre-screen phone chat, to ask and answer some technical questions and to get a feel for what one-on-one meetings would be like; then\n- provide an open-book take-home coding exercise, where they're given a codebase (closely based on the Wanderu production codebase) and a requirements doc and some design wireframes, to see if they can build out a (small, maybe ~250LOC) feature over the course of a few days; then\n- have the other frontend devs tear apart their submission before and during the interview, to see how well they handle criticism of their code; then\n- interview with designers, product people, and upper management, to see how well they interact with the people they'd be working with every day.\n\nFor this particular team and for this particular company's product, FizzBuzz is bullshit. Whiteboarding syntactically-correct code is bullshit. Memorizing trivia about today's hot Javascript framework is bullshit. And I think that's true for a lot of dev positions at a lot of companies. Very few places are doing the sort of work where every dev should know how to write a red-black tree class blindfolded. But those places are the Microsofts and Googles of the world, and if they're interviewing candidates a certain way then that must be the best way for every two-guys-and-a-webapp startup to do it too!, so here we are.\n\nBut every company in the world should be asking me to speak intelligently about what weird corners of past codebases I've had to pay extra unit-test attention to, or what proposals I wish TC39 would hurry up and get into the next version of ES.  Companies that instead ask me to turn an array into a binary tree, or to find the longest palindrome in a given string, or a trivia question where the answer should really be \"install a popular and well-tested npm module which does it for me\" are just wasting everybody's time.","title":"interviewing is weird","author":"orzechod@gmail.com","comments":[{"_id":"5e9b178d8ac20e000401b919","gravatarHash":"56caefa1a6f1f58ee54d9a5a753c7692","name":"orzechod@gmail.com","text":"lol interviewed at this one place and literally had to write the function which found the longest palindrome in a string.  ended up taking a position offered to me elsewhere."},{"_id":"5f009d25eb4d30000459a464","gravatarHash":"56caefa1a6f1f58ee54d9a5a753c7692","name":"orzechod@gmail.com","text":"http://lpiassaasly.website"}],"peerResourceId":"9dd0cd8b-0e3d-48df-bf0b-f7ac96020f1e","__v":"2"}
            ],
      metadata: {
        count: 1
      }
    };

    res.json(response).end();
  });

export default router;
