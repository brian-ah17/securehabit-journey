import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Video, BookOpen, Wrench, Search, ExternalLink } from "lucide-react";

// Define the type for resource items
type ResourceType = "article" | "video" | "course" | "tool";

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: ResourceType;
  tags: string[];
}

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ResourceType | "all">("all");

  // Resource data
  const resources: Resource[] = [
    {
      id: "1",
      title: "Understanding Phishing Attacks",
      description: "Learn to identify and avoid common phishing techniques.",
      url: "https://www.thecyberhelpline.com/guides/phishing-threatening-emails#:~:text=A%20phishing%20attack%20is%20when,usernames%20%26%20passwords%20and%20security%20information.",
      type: "article",
      tags: ["phishing", "email security", "awareness"]
    },
    {
      id: "2",
      title: "Creating Strong Passwords",
      description: "Best practices for creating and managing secure passwords.",
      url: "https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online/use-a-strong-and-separate-password-for-email",
      type: "article",
      tags: ["passwords", "account security", "digital hygiene"]
    },
    {
      id: "3",
      title: "Social Engineering Explained",
      description: "Watch this video to understand how social engineering attacks work.",
      url: "https://www.youtube.com/watch?v=uvKTMgWRPw4",
      type: "video",
      tags: ["social engineering", "awareness", "psychology"]
    },
    {
      id: "4",
      title: "Complete Cybersecurity for Beginners",
      description: "A comprehensive course covering all essential cybersecurity concepts.",
      url: "https://example.com/cyber-course",
      type: "course",
      tags: ["comprehensive", "beginners", "training"]
    },
    {
      id: "5",
      title: "Password Manager Comparison",
      description: "Compare different password managers to find the best one for your needs.",
      url: "https://www.pcmag.com/picks/the-best-password-managers",
      type: "article",
      tags: ["tools", "passwords", "comparison"]
    },
    {
      id: "6",
      title: "Two-Factor Authentication Tutorial",
      description: "Step-by-step guide to setting up 2FA on your accounts.",
      url: "https://www.ncsc.gov.uk/guidance/setting-2-step-verification-2sv",
      type: "video",
      tags: ["2FA", "account security", "tutorial"]
    },
    {
      id: "7",
      title: "Secure Browsing Practices",
      description: "Learn how to browse the web safely and securely.",
      url: "https://example.com/secure-browsing",
      type: "article",
      tags: ["browsing", "digital hygiene", "privacy"]
    },
    {
      id: "8",
      title: "Password Generator Tool",
      description: "Generate strong, random passwords with this online tool.",
      url: "https://example.com/password-generator",
      type: "tool",
      tags: ["passwords", "tools", "generator"]
    },
    {
      id: "9",
      title: "Advanced Threat Detection",
      description: "Learn advanced techniques for identifying sophisticated cyber threats.",
      url: "https://example.com/advanced-threats",
      type: "course",
      tags: ["advanced", "threat detection", "security"]
    },
    {
      id: "10",
      title: "Security Checkup Tool",
      description: "Scan your device for security vulnerabilities.",
      url: "https://example.com/security-checkup",
      type: "tool",
      tags: ["scanner", "vulnerability", "checkup"]
    }
  ];

  // Filter resources based on search query and selected type
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === "all" || resource.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  // Get icon based on resource type
  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case "article":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "course":
        return <BookOpen className="h-5 w-5" />;
      case "tool":
        return <Wrench className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-display mb-2">Resources</h1>
      <p className="text-cyber-text-secondary mb-8">
        Discover helpful articles, videos, courses, and tools to enhance your cybersecurity knowledge.
      </p>
      
      {/* Search and filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search resources..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" onValueChange={(value) => setSelectedType(value as ResourceType | "all")}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="article">Articles</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="course">Courses</TabsTrigger>
            <TabsTrigger value="tool">Tools</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Resource grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <Card key={resource.id} className="border border-slate-200 shadow-sm h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start mb-3">
                  <div className="bg-cyber-primary/10 p-2 rounded-full mr-3">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold line-clamp-1">{resource.title}</h3>
                    <p className="text-xs text-cyber-text-secondary capitalize">
                      {resource.type}
                    </p>
                  </div>
                </div>
                
                <p className="text-cyber-text-secondary text-sm mb-4 line-clamp-2">
                  {resource.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-slate-100 text-cyber-text-secondary text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button 
                  asChild
                  className="w-full mt-auto bg-cyber-primary hover:bg-cyber-primary/90 flex items-center justify-center"
                >
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    View Resource
                    <ExternalLink size={16} className="ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-cyber-text-secondary mb-4">
              No resources found matching your search criteria.
            </p>
            <Button onClick={() => {setSearchQuery(""); setSelectedType("all");}}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
