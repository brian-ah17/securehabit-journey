
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, ExternalLink, BookOpen, Video, FileText, Award } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

type Resource = {
  title: string;
  description: string;
  url: string;
  type: "article" | "video" | "course" | "tool";
};

const resourceCategories = {
  awareness: [
    {
      title: "CISA Cybersecurity Awareness Program",
      description: "Free training resources from the Cybersecurity and Infrastructure Security Agency",
      url: "https://www.cisa.gov/cybersecurity-awareness-program",
      type: "course"
    },
    {
      title: "Introduction to Cyber Attacks",
      description: "Learn about common cyber attacks and how they work",
      url: "https://www.coursera.org/learn/intro-cyber-attacks",
      type: "course"
    },
    {
      title: "How to Develop a Security Mindset",
      description: "An article on adopting a proactive cybersecurity approach",
      url: "https://www.wired.com/story/how-to-develop-security-mindset/",
      type: "article"
    },
  ],
  hygiene: [
    {
      title: "Have I Been Pwned",
      description: "Check if your email or phone has been in a data breach",
      url: "https://haveibeenpwned.com/",
      type: "tool"
    },
    {
      title: "Creating a Strong Password Policy",
      description: "NIST recommendations for secure password practices",
      url: "https://www.nist.gov/blogs/cybersecurity-insights/back-basics-whats-good-password",
      type: "article"
    },
    {
      title: "Two-Factor Authentication Explained",
      description: "A guide to understanding and implementing 2FA",
      url: "https://www.youtube.com/watch?v=q4ZF2Ma4ClI",
      type: "video"
    },
  ],
  threatDetection: [
    {
      title: "Phishing Quiz",
      description: "Test your ability to spot phishing emails",
      url: "https://phishingquiz.withgoogle.com/",
      type: "tool"
    },
    {
      title: "Social Engineering Red Flags",
      description: "Learn to identify common social engineering tactics",
      url: "https://www.sans.org/security-awareness-training/resources/social-engineering-red-flags",
      type: "article"
    },
    {
      title: "How to Spot a Scam",
      description: "FTC guide to recognizing and avoiding scams",
      url: "https://consumer.ftc.gov/articles/how-spot-avoid-and-report-fake-check-scams",
      type: "article"
    },
  ],
  legal: [
    {
      title: "Cybersecurity Law 101",
      description: "An introduction to cybersecurity regulations",
      url: "https://www.lawfareblog.com/cybersecurity-law-101-primer-law-cybersecurity",
      type: "article"
    },
    {
      title: "FBI Internet Crime Complaint Center",
      description: "Report cybercrime to the FBI",
      url: "https://www.ic3.gov/",
      type: "tool"
    },
    {
      title: "Data Privacy Laws Around the World",
      description: "An overview of international data protection regulations",
      url: "https://www.privacypolicies.com/blog/privacy-laws-by-country/",
      type: "article"
    },
  ]
};

const ResourceTypeIcon = ({ type }: { type: Resource["type"] }) => {
  switch (type) {
    case "article":
      return <FileText size={16} className="text-blue-500" />;
    case "video":
      return <Video size={16} className="text-red-500" />;
    case "course":
      return <BookOpen size={16} className="text-green-500" />;
    case "tool":
      return <Award size={16} className="text-purple-500" />;
    default:
      return <Link size={16} />;
  }
};

const Resources = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold font-display mb-2">Cybersecurity Resources</h1>
          <p className="text-cyber-text-secondary">
            Explore these curated resources to deepen your cybersecurity knowledge and skills.
          </p>
        </div>

        <Tabs defaultValue="awareness" className="space-y-6">
          <TabsList className="mb-6">
            <TabsTrigger value="awareness">Awareness</TabsTrigger>
            <TabsTrigger value="hygiene">Digital Hygiene</TabsTrigger>
            <TabsTrigger value="threatDetection">Threat Detection</TabsTrigger>
            <TabsTrigger value="legal">Legal Context</TabsTrigger>
          </TabsList>

          {Object.entries(resourceCategories).map(([category, resources]) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resources.map((resource, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <ResourceTypeIcon type={resource.type} />
                      </div>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center"
                        asChild
                      >
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          Visit Resource <ExternalLink size={14} className="ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Resources;
