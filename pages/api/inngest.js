import { Inngest } from "inngest";
import { serve } from "inngest/next";

// Create a client to send and receive events
export const inngest = new Inngest({ name: "My App" });

// Create an API that serves zero functions
export default serve(inngest, [helloWorld,]);

// Step 2 code...

const helloWorld = inngest.createFunction(
    { name: "Hello World" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
      await step.sleep("1s");
      return { event, body: "Hello, World!" };
    }
  );
  