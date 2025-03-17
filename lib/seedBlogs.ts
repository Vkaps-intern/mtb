import { prisma } from "./prisma";

async function main() {
  // Delete existing blogs if needed for clean seeding
  await prisma.blog.deleteMany({});

  const blogs = [
    {
      title: "Building a Successful Solo Business",
      excerpt:
        "Learn the key strategies that successful solopreneurs use to build and grow their businesses.",
      image: "/images/blog/post-1.jpg",
      content: `
        # Building a Successful Solo Business

        Starting and growing a successful solo business requires strategic planning, consistent execution, and a clear vision. In this article, we'll explore the essential strategies that can help you thrive as a solopreneur.

        ## Define Your Niche
        The most successful solo businesses have a well-defined niche. By focusing on a specific market segment or problem, you can establish yourself as an expert and differentiate from competitors.

        ## Build Systems Early
        From day one, create efficient systems and processes. This includes automating repetitive tasks, establishing clear workflows, and documenting your procedures.

        ## Price for Profitability
        Many solopreneurs undercharge for their services. Calculate your true costs, including overhead and your own salary, to set prices that ensure your business is sustainable.

        ## Leverage Your Network
        Your existing connections can be your first clients and best referral sources. Don't be shy about letting your network know what you offer.

        ## Consistent Marketing
        Even when busy with client work, maintain a consistent marketing presence. This prevents the feast-or-famine cycle that plagues many solo businesses.
      `,
      readTime: "5 min read",
      createdAt: new Date("2024-03-15T12:00:00Z"),
      updatedAt: new Date("2024-03-15T12:00:00Z"),
    },
    {
      title: "Mastering Productivity When Working Remotely",
      excerpt:
        "Discover practical techniques to maintain focus and productivity in a remote work environment.",
      image: "/images/blog/post-2.jpg",
      content: `
        # Mastering Productivity When Working Remotely

        Remote work offers flexibility but comes with unique challenges for maintaining productivity. Here are proven strategies to help you stay focused and efficient while working from home.

        ## Create a Dedicated Workspace
        Set up a specific area in your home designated solely for work. This helps create mental boundaries between professional and personal life.

        ## Establish a Routine
        Start and end your workday at consistent times. Include breaks and lunch periods just as you would in an office setting.

        ## Use the Pomodoro Technique
        Work in focused 25-minute intervals followed by 5-minute breaks. After four cycles, take a longer 15-30 minute break.

        ## Minimize Distractions
        Identify your common distractions and create strategies to manage them. This might include silencing notifications, communicating boundaries to household members, or using website blockers.

        ## Prioritize Deep Work
        Schedule blocks of time for complex tasks requiring concentration. Protect these time blocks from meetings and interruptions.
      `,
      readTime: "7 min read",
      createdAt: new Date("2024-03-10T09:30:00Z"),
      updatedAt: new Date("2024-03-10T09:30:00Z"),
    },
    {
      title: "Essential Digital Tools for Small Businesses",
      excerpt:
        "A curated list of the most effective digital tools that can help small businesses streamline operations and grow.",
      image: "/images/blog/post-3.jpg",
      content: `
        # Essential Digital Tools for Small Businesses

        The right digital tools can dramatically improve your small business's efficiency and scalability. Here's our curated selection of must-have software solutions for today's entrepreneurs.

        ## Project Management
        Tools like Asana, Trello, or ClickUp help you organize tasks, collaborate with team members, and track project progress.

        ## Financial Management
        QuickBooks, Xero, or Wave simplify bookkeeping, invoicing, and financial reporting for small businesses.

        ## Customer Relationship Management
        HubSpot CRM, Zoho CRM, or Pipedrive help you manage leads, track customer interactions, and organize your sales process.

        ## Communication & Collaboration
        Slack, Microsoft Teams, or Google Workspace provide integrated solutions for team communication, file sharing, and collaboration.

        ## Marketing Automation
        Tools like Mailchimp, ConvertKit, or ActiveCampaign streamline email marketing campaigns and customer outreach.

        ## Social Media Management
        Buffer, Hootsuite, or Later allow you to schedule posts, analyze performance, and manage multiple social accounts from one dashboard.
      `,
      readTime: "6 min read",
      createdAt: new Date("2024-03-05T15:45:00Z"),
      updatedAt: new Date("2024-03-05T15:45:00Z"),
    },
    {
      title: "Building Your Personal Brand Online",
      excerpt:
        "Strategic steps to develop and grow your personal brand in the digital landscape.",
      image: "/images/blog/post-4.jpg",
      content: `
        # Building Your Personal Brand Online

        A strong personal brand can open doors to new opportunities and establish you as an authority in your field. Here's how to develop and grow your digital presence effectively.

        ## Define Your Brand Identity
        Start by clarifying your values, strengths, expertise, and the unique perspective you bring to your industry.

        ## Create Consistent Visual Elements
        Develop a consistent visual language with a professional photo, color scheme, and typography that appears across all your platforms.

        ## Share Valuable Content
        Regularly publish content that demonstrates your expertise and provides real value to your audience. Focus on quality over quantity.

        ## Engage Authentically
        Respond to comments, participate in relevant discussions, and build genuine connections with others in your field.

        ## Choose Platforms Strategically
        Rather than trying to be everywhere, focus on the 1-2 platforms where your target audience is most active.

        ## Monitor Your Online Reputation
        Set up Google Alerts for your name and regularly review how you appear in search results.
      `,
      readTime: "8 min read",
      createdAt: new Date("2024-02-28T11:20:00Z"),
      updatedAt: new Date("2024-02-28T11:20:00Z"),
    },
    {
      title: "Effective Customer Retention Strategies",
      excerpt:
        "Learn proven methods to increase customer loyalty and reduce churn in your business.",
      image: "/images/blog/post-5.jpg",
      content: `
        # Effective Customer Retention Strategies

        Keeping existing customers is typically far more cost-effective than acquiring new ones. Here are proven strategies to build loyalty and reduce churn.

        ## Exceptional Onboarding
        Create a smooth, informative onboarding process that helps customers quickly realize value from your product or service.

        ## Proactive Communication
        Reach out to customers regularly with relevant information, updates, and personalized recommendations.

        ## Loyalty Programs
        Implement a structured loyalty program that rewards repeat business and long-term relationships.

        ## Gather and Act on Feedback
        Regularly collect customer feedback through surveys, direct conversations, and reviews, then demonstrably act on that input.

        ## Personalized Experiences
        Use customer data to create personalized experiences, recommendations, and communications.

        ## Recovery Strategy
        Have a clear process for addressing customer complaints and service failures, turning negative experiences into positive ones.
      `,
      readTime: "6 min read",
      createdAt: new Date("2024-02-20T14:15:00Z"),
      updatedAt: new Date("2024-02-20T14:15:00Z"),
    },
  ];

  // Create the blogs in the database
  for (const blog of blogs) {
    await prisma.blog.create({
      data: blog,
    });
  }

  console.log("Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
