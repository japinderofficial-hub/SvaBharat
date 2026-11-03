import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Settings, 
  FileText, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  List, 
  Link2, 
  Eye, 
  Check, 
  Sparkles,
  RefreshCw,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ListOrdered,
  Quote,
  Image
} from "lucide-react";
import { 
  type Blog, 
  type Testimonial, 
  getBlogs, 
  saveBlogs, 
  getTestimonials, 
  saveTestimonials
} from "../utils/storage";
import { commitToGitHub } from "../utils/github";


export function Admin() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  
  // Tabs: 'blogs' | 'testimonials' | 'settings'
  const [activeTab, setActiveTab] = useState<"blogs" | "testimonials" | "settings">("blogs");




  
  // Sub-tabs for Blogs
  const [blogSubTab, setBlogSubTab] = useState<"create" | "manage">("create");
  
  // Sub-tabs for Testimonials
  const [testSubTab, setTestSubTab] = useState<"create" | "manage">("create");

  // State lists
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Syncing state
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Settings state
  const [githubToken, setGithubToken] = useState("");
  const [githubRepo, setGithubRepo] = useState("");

  // Form states - Blog
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogCategory, setBlogCategory] = useState("Policy");
  const [blogReadTime, setBlogReadTime] = useState("5 min read");
  const [blogAuthorName, setBlogAuthorName] = useState("");
  const [blogAuthorDesignation, setBlogAuthorDesignation] = useState("");
  const [blogFormat, setBlogFormat] = useState("Write Blog (Rich Text Editor)");
  const [blogCover, setBlogCover] = useState("linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)");
  const [blogContent, setBlogContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [contentImages, setContentImages] = useState<{ [key: string]: string }>({});

  // Form states - Testimonial
  const [editingTestId, setEditingTestId] = useState<string | null>(null);
  const [testName, setTestName] = useState("");
  const [testRole, setTestRole] = useState("");
  const [testQuote, setTestQuote] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentImageInputRef = useRef<HTMLInputElement>(null);

  // Presets for cover background
  const PRESET_GRADIENTS = [
    { name: "Sunset Orange", value: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)" },
    { name: "Ocean Blue", value: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)" },
    { name: "Forest Mint", value: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)" },
    { name: "Golden Sand", value: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)" },
    { name: "Plum Purple", value: "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)" },
    { name: "SvaBharat Crimson", value: "linear-gradient(135deg, #e65c00 0%, #F9D423 100%)" }
  ];

  useEffect(() => {
    // Load initial data
    setBlogs(getBlogs());
    setTestimonials(getTestimonials());

    // Load GitHub Settings
    setGithubToken(localStorage.getItem("svabharat_github_token") || "");
    setGithubRepo(localStorage.getItem("svabharat_github_repo") || "japinderofficial-hub/SvaBharat");
  }, []);




  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPasscode = import.meta.env.VITE_ADMIN_PASSCODE || "1234";
    if (passcode === correctPasscode) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect passcode. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode("");
  };

  // Helper to trigger API and LocalStorage sync
  const triggerSync = async (updatedBlogs: Blog[], updatedTestimonials: Testimonial[], message: string) => {
    setIsSyncing(true);
    setSyncStatus("Saving changes...");
    
    // Save to LocalStorage first
    saveBlogs(updatedBlogs);
    saveTestimonials(updatedTestimonials);

    const storedToken = import.meta.env.VITE_GITHUB_TOKEN || localStorage.getItem("svabharat_github_token");
    const storedRepo = import.meta.env.VITE_GITHUB_REPO || localStorage.getItem("svabharat_github_repo");
    const storedBranch = import.meta.env.VITE_GITHUB_BRANCH || localStorage.getItem("svabharat_github_branch") || "main";

    if (!storedToken || !storedRepo) {
      setIsSyncing(false);
      setSyncStatus("Sync failed: GitHub token or repository path is missing. Configure VITE_GITHUB_TOKEN and VITE_GITHUB_REPO in your environment.");
      return;
    }

    setSyncStatus("Pushing updates directly to GitHub via API...");
    try {
      // Sync blogs.json
      const blogsRes = await commitToGitHub(
        storedToken,
        storedRepo,
        "src/data/blogs.json",
        JSON.stringify(updatedBlogs, null, 2),
        message,
        storedBranch
      );

      // Sync testimonials.json
      const testRes = await commitToGitHub(
        storedToken,
        storedRepo,
        "src/data/testimonials.json",
        JSON.stringify(updatedTestimonials, null, 2),
        message,
        storedBranch
      );

      setIsSyncing(false);
      if (blogsRes.success && testRes.success) {
        setSyncStatus(`Successfully published and deployed to GitHub branch "${storedBranch}"!`);
      } else {
        const errMsg = !blogsRes.success ? blogsRes.message : testRes.message;
        setSyncStatus(`GitHub Sync Error: ${errMsg}`);
      }
    } catch (err: any) {
      setIsSyncing(false);
      setSyncStatus(`GitHub Sync Exception: ${err.message || err}`);
    }

    // Clear status after 6 seconds
    setTimeout(() => {
      setSyncStatus(null);
    }, 6000);
  };


  // Image upload simulator - base64 converter
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size is too large (max 10MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setBlogCover(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Insert Rich Text Formatting
  const insertTag = (openTag: string, closeTag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const replacement = openTag + selectedText + closeTag;

    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setBlogContent(newContent);

    // Reposition cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + openTag.length, start + openTag.length + selectedText.length);
    }, 0);
  };

  const extractBase64Images = (content: string) => {
    const mapping: { [key: string]: string } = {};
    let index = 0;
    const processedContent = content.replace(
      /src=["'](data:image\/[^;]+;base64,[^"']+)["']/g,
      (_, base64Url) => {
        const key = `local-image-${Date.now()}-${index++}`;
        mapping[key] = base64Url;
        return `src="${key}"`;
      }
    );
    return { processedContent, mapping };
  };

  const resolveImagesForDisplay = (content: string) => {
    let processed = content;
    Object.entries(contentImages).forEach(([key, base64]) => {
      processed = processed.split(key).join(base64);
    });
    return processed;
  };

  const insertLink = () => {
    const url = prompt("Enter URL:", "https://");
    if (url === null) return; // User cancelled
    insertTag(`<a href="${url}" target="_blank" rel="noopener noreferrer">`, "</a>");
  };

  const insertImage = () => {
    const choice = confirm("Click OK to upload a local image, or Cancel to enter an image URL.");
    if (choice) {
      contentImageInputRef.current?.click();
    } else {
      const url = prompt("Enter Image URL:", "https://");
      if (url) {
        const alt = prompt("Enter image description (alt text):", "Image");
        insertTag(`<img src="${url}" alt="${alt || 'Image'}" />`, "");
      }
    }
  };

  const handleContentImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size is too large (max 5MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const key = `local-image-${Date.now()}`;
          setContentImages(prev => ({ ...prev, [key]: reader.result as string }));
          insertTag(`<img src="${key}" alt="${file.name}" />`, "");
        }
      };
      reader.readAsDataURL(file);
      e.target.value = ""; // Reset
    }
  };

  // Handle Publish / Update Blog
  const handlePublishBlog = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!blogTitle.trim()) {
      alert("Please fill in the blog title.");
      return;
    }

    let updatedBlogsList: Blog[];
    let commitMsg = "";
    const finalContent = resolveImagesForDisplay(blogContent);

    if (editingBlogId) {
      // Edit mode
      updatedBlogsList = blogs.map(b => 
        b.id === editingBlogId 
          ? {
              ...b,
              title: blogTitle,
              excerpt: blogExcerpt,
              category: blogCategory,
              readTime: blogReadTime,
              authorName: blogAuthorName || "SvaBharat Thinker",
              authorDesignation: blogAuthorDesignation || "Contributor",
              format: blogFormat,
              coverPhoto: blogCover,
              content: finalContent,
            }
          : b
      );
      commitMsg = `cms: update blog post "${blogTitle}"`;
      setEditingBlogId(null);
    } else {
      // Create mode
      const newBlog: Blog = {
        id: "blog-" + Date.now(),
        title: blogTitle,
        excerpt: blogExcerpt,
        category: blogCategory,
        readTime: blogReadTime,
        authorName: blogAuthorName || "SvaBharat Thinker",
        authorDesignation: blogAuthorDesignation || "Contributor",
        coverPhoto: blogCover,
        content: finalContent || "<p>Write content here...</p>",
        createdAt: new Date().toISOString(),
        published: true
      };
      updatedBlogsList = [newBlog, ...blogs];
      commitMsg = `cms: publish blog post "${blogTitle}"`;
    }

    setBlogs(updatedBlogsList);
    
    // Reset Form
    setBlogTitle("");
    setBlogExcerpt("");
    setBlogAuthorName("");
    setBlogAuthorDesignation("");
    setBlogContent("");
    setBlogCover(PRESET_GRADIENTS[0].value);
    setContentImages({});
    
    // Switch to manage list view
    setBlogSubTab("manage");
    
    // Sync with server
    await triggerSync(updatedBlogsList, testimonials, commitMsg);
  };

  // Delete Blog
  const handleDeleteBlog = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const updatedList = blogs.filter(b => b.id !== id);
      setBlogs(updatedList);
      await triggerSync(updatedList, testimonials, `cms: delete blog post "${title}"`);
    }
  };

  // Select Blog for Editing
  const handleEditBlogSelect = (blog: Blog) => {
    setEditingBlogId(blog.id);
    setBlogTitle(blog.title);
    setBlogExcerpt(blog.excerpt);
    setBlogCategory(blog.category);
    setBlogReadTime(blog.readTime);
    setBlogAuthorName(blog.authorName);
    setBlogAuthorDesignation(blog.authorDesignation);
    setBlogCover(blog.coverPhoto);
    
    const { processedContent, mapping } = extractBase64Images(blog.content);
    setContentImages(mapping);
    setBlogContent(processedContent);
    
    setBlogSubTab("create");
  };

  // Handle Save / Edit Testimonial
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!testName.trim() || !testQuote.trim()) {
      alert("Please fill out the name and quote fields.");
      return;
    }

    let updatedTestimonialsList: Testimonial[];
    let commitMsg = "";

    if (editingTestId) {
      // Edit
      updatedTestimonialsList = testimonials.map(t => 
        t.id === editingTestId 
          ? {
              ...t,
              name: testName,
              role: testRole,
              quote: testQuote
            }
          : t
      );
      commitMsg = `cms: update testimonial from "${testName}"`;
      setEditingTestId(null);
    } else {
      // Create
      const newTest: Testimonial = {
        id: "test-" + Date.now(),
        name: testName,
        role: testRole || "Thinker",
        quote: testQuote,
        createdAt: new Date().toISOString()
      };
      updatedTestimonialsList = [newTest, ...testimonials];
      commitMsg = `cms: add testimonial from "${testName}"`;
    }

    setTestimonials(updatedTestimonialsList);
    
    // Reset Form
    setTestName("");
    setTestRole("");
    setTestQuote("");
    
    // Switch to manage list view
    setTestSubTab("manage");
    
    // Sync with server
    await triggerSync(blogs, updatedTestimonialsList, commitMsg);
  };

  // Delete Testimonial
  const handleDeleteTestimonial = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the testimonial from "${name}"?`)) {
      const updatedList = testimonials.filter(t => t.id !== id);
      setTestimonials(updatedList);
      await triggerSync(blogs, updatedList, `cms: delete testimonial from "${name}"`);
    }
  };

  // Select Testimonial for Editing
  const handleEditTestSelect = (test: Testimonial) => {
    setEditingTestId(test.id);
    setTestName(test.name);
    setTestRole(test.role);
    setTestQuote(test.quote);
    setTestSubTab("create");
  };

  // Render Passcode Screen (Authentication Gate)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream-dark flex items-center justify-center p-6 select-none font-sans">
        <div className="bg-white p-8 md:p-10 rounded-2xl border-2 border-white shadow-xl max-w-md w-full text-center transition-all">
          <div className="w-12 h-12 bg-secondary-light rounded-xl flex items-center justify-center mx-auto mb-6 border border-secondary/20">
            <Settings className="w-6 h-6 text-secondary animate-spin-slow" />
          </div>
          
          <h2 className="text-3xl font-serif font-extrabold text-charcoal tracking-tight mb-2">Admin Access</h2>
          <p className="text-sm font-semibold text-neutral-500 mb-8">Please enter the passcode to continue</p>
          
          <form onSubmit={handleUnlock} className="space-y-6">
            <div>
              <input 
                type="password" 
                maxLength={4}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value.replace(/\D/g, ""))}
                placeholder="••••"
                className="w-full text-center tracking-[1.5em] text-xl font-bold px-4 py-4 rounded-xl border-2 border-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-cream/20 text-charcoal transition-all"
              />
              {authError && (
                <p className="text-xs text-burgundy font-bold mt-3 animate-pulse">{authError}</p>
              )}
            </div>
            
            <button 
              type="submit"
              className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-secondary transition-colors shadow-sm active:scale-[0.98] cursor-pointer"
            >
              Unlock
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-white/40 flex flex-col gap-3">
            <Link to="/" className="text-xs font-bold text-neutral-400 hover:text-primary transition-colors block uppercase tracking-wider">
              Return to site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render Main Admin Dashboard
  return (
    <div className="min-h-screen bg-cream text-charcoal pb-24 px-4 sm:px-6 md:px-12 lg:px-24 font-sans">
      {/* Sync Status Floating Notification */}
      {syncStatus && (
        <div className="fixed bottom-6 right-6 z-50 bg-charcoal text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-neutral-805 max-w-md text-sm animate-fade-in font-bold">
          {isSyncing ? (
            <RefreshCw className="w-4 h-4 text-secondary animate-spin flex-shrink-0" />
          ) : (
            <Check className="w-4 h-4 text-success flex-shrink-0" />
          )}
          <span>{syncStatus}</span>
        </div>
      )}

      {/* Top Navigation */}
      <header className="py-8 flex flex-col gap-6">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-xs text-neutral-500 hover:text-primary transition-all group font-bold uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-extrabold tracking-tight mb-2 text-charcoal">Admin Portal</h1>
            <p className="text-neutral-600 font-semibold text-sm leading-relaxed">Manage your Blogs and Testimonials. Changes auto-deploy.</p>
          </div>
          <div>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-xs font-bold text-neutral-500 hover:text-burgundy border-2 border-white bg-white hover:border-burgundy-light rounded-xl transition-all cursor-pointer active:scale-95 shadow-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Master Tabs (Blogs / Testimonials) */}
      <div className="bg-cream-dark p-1.5 rounded-2xl flex w-full sm:w-fit mb-8 gap-2 border-2 border-white shadow-sm">
        <button 
          onClick={() => setActiveTab("blogs")}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "blogs" 
              ? "bg-white text-primary shadow-md border border-white/20" 
              : "text-neutral-600 hover:text-primary"
          }`}
        >
          <FileText className="w-4 h-4" />
          Blogs
        </button>
        <button 
          onClick={() => setActiveTab("testimonials")}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "testimonials" 
              ? "bg-white text-primary shadow-md border border-white/20" 
              : "text-neutral-600 hover:text-primary"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Testimonials
        </button>
        <button 
          onClick={() => setActiveTab("settings")}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "settings" 
              ? "bg-white text-primary shadow-md border border-white/20" 
              : "text-neutral-600 hover:text-primary"
          }`}
        >
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>

      {/* Content Section: Blogs */}
      {activeTab === "settings" && (
        <div className="bg-white rounded-2xl p-6 sm:p-10 border-2 border-white shadow-md max-w-2xl">
          <h2 className="text-2xl font-serif font-extrabold mb-8 text-charcoal">
            GitHub Sync Settings
          </h2>
          <p className="text-sm font-semibold text-neutral-500 mb-6 leading-relaxed">
            Configure your GitHub credentials here. This allows the Admin portal to push updates directly to your GitHub repository whenever you publish a blog or testimonial, triggering Vercel to rebuild and update the live site. 
          </p>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">GitHub Repository</label>
              <input 
                type="text" 
                placeholder="e.g. japinderofficial-hub/SvaBharat"
                value={githubRepo}
                onChange={(e) => setGithubRepo(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-semibold bg-cream/10"
              />
              <p className="text-xs font-semibold text-neutral-400">Format: username/repo-name</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">Personal Access Token (PAT)</label>
              <input 
                type="password" 
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxx"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-semibold bg-cream/10"
              />
              <p className="text-xs font-semibold text-neutral-400">Your token is stored locally in your browser and never sent anywhere except GitHub API.</p>
            </div>

            <button 
              onClick={() => {
                localStorage.setItem("svabharat_github_token", githubToken);
                localStorage.setItem("svabharat_github_repo", githubRepo);
                alert("Settings saved successfully! Blogs and Testimonials will now auto-push to GitHub.");
              }}
              className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-secondary transition-colors shadow-sm cursor-pointer active:scale-95"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Content Section: Blogs */}
      {activeTab === "blogs" && (
        <div className="space-y-6">
          {/* Subtabs layout */}
          <div className="flex gap-4 border-b border-white/45 pb-4">
            <button 
              onClick={() => { 
                setBlogSubTab("create"); 
                setEditingBlogId(null); 
                setBlogTitle("");
                setBlogExcerpt("");
                setBlogAuthorName("");
                setBlogAuthorDesignation("");
                setBlogContent("");
                setBlogCover(PRESET_GRADIENTS[0].value);
                setContentImages({});
              }}
              className={`pb-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                blogSubTab === "create" && !editingBlogId
                  ? "border-primary text-primary" 
                  : "border-transparent text-neutral-500 hover:text-primary"
              }`}
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Create Blog
            </button>
            {editingBlogId && (
              <span className="pb-2 text-sm font-bold border-b-2 border-primary text-primary">
                <Edit3 className="w-4 h-4 inline mr-1" />
                Edit Blog: {blogTitle.slice(0, 15)}...
              </span>
            )}
            <button 
              onClick={() => setBlogSubTab("manage")}
              className={`pb-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                blogSubTab === "manage" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-neutral-500 hover:text-primary"
              }`}
            >
              Manage Blogs ({blogs.length})
            </button>
          </div>

          {/* Subtab: CREATE/EDIT BLOG FORM */}
          {blogSubTab === "create" && (
            <div className="bg-white rounded-2xl p-6 sm:p-10 border-2 border-white shadow-md max-w-5xl">
              <h2 className="text-2xl font-serif font-extrabold mb-8 text-charcoal">
                {editingBlogId ? "Edit Blog Post" : "New Blog Post"}
              </h2>

              <form onSubmit={handlePublishBlog} className="space-y-8">
                {/* 2-Column fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">Blog Title</label>
                    <input 
                      type="text" 
                      placeholder="Enter the main title"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-semibold bg-cream/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">Author Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter author's name"
                      value={blogAuthorName}
                      onChange={(e) => setBlogAuthorName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-semibold bg-cream/10"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">Excerpt (Short Description)</label>
                    <textarea 
                      placeholder="Brief description shown on the insights page"
                      rows={2}
                      value={blogExcerpt}
                      onChange={(e) => setBlogExcerpt(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-semibold resize-none bg-cream/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">Category</label>
                    <select 
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-semibold bg-white"
                    >
                      <option value="Policy">Policy</option>
                      <option value="Education">Education</option>
                      <option value="Environment">Environment</option>
                      <option value="Culture">Culture</option>
                      <option value="Technology">Technology</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">Read Time</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 5 min read"
                      value={blogReadTime}
                      onChange={(e) => setBlogReadTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-semibold bg-cream/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">Author Designation</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Research Associate / Director"
                      value={blogAuthorDesignation}
                      onChange={(e) => setBlogAuthorDesignation(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-semibold bg-cream/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">Import Method / Blog Format</label>
                    <select 
                      value={blogFormat}
                      onChange={(e) => setBlogFormat(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-semibold bg-white"
                    >
                      <option value="Write Blog (Rich Text Editor)">Write Blog (Rich Text Editor)</option>
                      <option value="Markdown Import">Markdown Import (Coming Soon)</option>
                    </select>
                  </div>
                </div>

                {/* Cover Photo */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">Cover Photo</label>
                  
                  {/* Preset Gradients selectors */}
                  <div className="flex flex-wrap gap-3 items-center mb-4">
                    <span className="text-xs text-neutral-400 font-bold mr-2">Quick Presets:</span>
                    {PRESET_GRADIENTS.map((preset) => (
                      <button 
                        key={preset.name}
                        type="button"
                        onClick={() => setBlogCover(preset.value)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer hover:scale-110 ${
                          blogCover === preset.value ? "border-neutral-800 scale-105" : "border-transparent"
                        }`}
                        style={{ background: preset.value }}
                        title={preset.name}
                      />
                    ))}
                  </div>

                  {/* Upload box */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-2">
                      <label className="border-2 border-dashed border-white/80 hover:border-primary rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors relative h-40">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload} 
                          className="hidden" 
                        />
                        <div className="w-10 h-10 bg-secondary-light text-secondary rounded-xl flex items-center justify-center mb-3">
                          <Upload className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-bold text-neutral-700 mb-1">Click to upload or drag and drop</p>
                        <p className="text-xs text-neutral-400 font-bold">PNG, JPG, WebP up to 10 MB</p>
                      </label>
                    </div>

                    {/* Preview of Cover */}
                    <div className="h-40 rounded-2xl border-2 border-white flex items-center justify-center overflow-hidden shadow-md relative group bg-cream-dark">
                      {blogCover.startsWith("linear-gradient") ? (
                        <div className="w-full h-full" style={{ background: blogCover }} />
                      ) : (
                        <img src={blogCover} alt="Cover Preview" className="w-full h-full object-cover" />
                      )}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-neutral-900/60 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-sm">
                        Cover Preview
                      </span>
                    </div>
                  </div>
                </div>
                                {/* Rich Text Editor Component */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">Blog Content</label>
                    <button 
                      type="button" 
                      onClick={() => setShowPreview(!showPreview)}
                      className="text-xs font-bold text-primary hover:text-secondary flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {showPreview ? "Show Editor" : "Show HTML Preview"}
                    </button>
                  </div>

                   {!showPreview ? (
                    <div className="border-2 border-white rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
                      {/* Hidden image input for editor content */}
                      <input 
                        type="file" 
                        ref={contentImageInputRef}
                        accept="image/*" 
                        onChange={handleContentImageUpload} 
                        className="hidden" 
                      />

                      {/* Editor Toolbar */}
                      <div className="bg-cream-dark border-b border-white/30 px-4 py-2.5 flex flex-wrap gap-2 items-center">
                        {/* Headers & Paragraph */}
                        <button type="button" onClick={() => insertTag("<h1>", "</h1>")} className="p-1.5 hover:bg-cream-deep/60 text-neutral-600 hover:text-primary rounded-lg text-xs font-extrabold transition-colors duration-150" title="Heading 1">H1</button>
                        <button type="button" onClick={() => insertTag("<h2>", "</h2>")} className="p-1.5 hover:bg-cream-deep/60 text-neutral-600 hover:text-primary rounded-lg text-xs font-extrabold transition-colors duration-150" title="Heading 2">H2</button>
                        <button type="button" onClick={() => insertTag("<h3>", "</h3>")} className="p-1.5 hover:bg-cream-deep/60 text-neutral-600 hover:text-primary rounded-lg text-xs font-extrabold transition-colors duration-150" title="Heading 3">H3</button>
                        <button type="button" onClick={() => insertTag("<p>", "</p>")} className="p-1.5 hover:bg-cream-deep/60 text-neutral-600 hover:text-primary rounded-lg text-xs font-extrabold transition-colors duration-150" title="Paragraph">P</button>
                        
                        <span className="w-[1px] h-4 bg-neutral-400/40 mx-1" />
                        
                        {/* Formatting */}
                        <button type="button" onClick={() => insertTag("<strong>", "</strong>")} className="p-1.5 hover:bg-cream-deep/60 text-neutral-600 hover:text-primary rounded-lg text-sm font-extrabold transition-colors duration-150" title="Bold">B</button>
                        <button type="button" onClick={() => insertTag("<em>", "</em>")} className="p-1.5 hover:bg-cream-deep/60 text-neutral-600 hover:text-primary rounded-lg text-sm font-bold italic transition-colors duration-150" title="Italic">I</button>
                        <button type="button" onClick={() => insertTag("<u>", "</u>")} className="p-1.5 hover:bg-cream-deep/60 text-neutral-600 hover:text-primary rounded-lg text-sm font-bold underline transition-colors duration-150" title="Underline">U</button>
                        
                        <span className="w-[1px] h-4 bg-neutral-400/40 mx-1" />
                        
                        {/* Alignment */}
                        <button type="button" onClick={() => insertTag('<div style="text-align: left;">', '</div>')} className="p-1.5 hover:bg-cream-deep/60 text-neutral-600 hover:text-primary rounded-lg transition-colors duration-150" title="Align Left"><AlignLeft className="w-4 h-4" /></button>
                        <button type="button" onClick={() => insertTag('<div style="text-align: center;">', '</div>')} className="p-1.5 hover:bg-cream-deep/60 text-neutral-600 hover:text-primary rounded-lg transition-colors duration-150" title="Align Center"><AlignCenter className="w-4 h-4" /></button>
                        <button type="button" onClick={() => insertTag('<div style="text-align: right;">', '</div>')} className="p-1.5 hover:bg-cream-deep/60 text-neutral-600 hover:text-primary rounded-lg transition-colors duration-150" title="Align Right"><AlignRight className="w-4 h-4" /></button>
                        
                        <span className="w-[1px] h-4 bg-neutral-400/40 mx-1" />
                        
                        {/* Lists & Quotes */}
                        <button type="button" onClick={() => insertTag("<ul>\n  <li>", "</li>\n</ul>")} className="p-1.5 hover:bg-cream-deep/60 text-neutral-600 hover:text-primary rounded-lg transition-colors duration-150" title="Unordered List"><List className="w-4 h-4" /></button>
                        <button type="button" onClick={() => insertTag("<ol>\n  <li>", "</li>\n</ol>")} className="p-1.5 hover:bg-cream-deep/60 text-neutral-600 hover:text-primary rounded-lg transition-colors duration-150" title="Ordered List"><ListOrdered className="w-4 h-4" /></button>
                        <button type="button" onClick={() => insertTag("<blockquote>", "</blockquote>")} className="p-1.5 hover:bg-cream-deep/60 text-neutral-600 hover:text-primary rounded-lg transition-colors duration-150" title="Quote"><Quote className="w-4 h-4" /></button>
                        
                        <span className="w-[1px] h-4 bg-neutral-400/40 mx-1" />
                        
                        {/* Media */}
                        <button type="button" onClick={insertLink} className="p-1.5 hover:bg-cream-deep/60 text-neutral-600 hover:text-primary rounded-lg transition-colors duration-150" title="Link"><Link2 className="w-4 h-4" /></button>
                        <button type="button" onClick={insertImage} className="p-1.5 hover:bg-cream-deep/60 text-neutral-600 hover:text-primary rounded-lg transition-colors duration-150" title="Image"><Image className="w-4 h-4" /></button>
                      </div>

                      {/* Editor Textarea */}
                      <textarea 
                        ref={textareaRef}
                        rows={12}
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        placeholder="Start writing your blog content here... Use the HTML tags or the toolbar above to format text, insert images, add links, and more."
                        className="w-full px-4 py-4 focus:outline-none text-sm font-semibold resize-y leading-relaxed font-mono bg-white text-charcoal"
                      />
                    </div>
                  ) : (
                    /* Content HTML Preview */
                    <div className="border-2 border-white rounded-xl p-6 min-h-[300px] rich-text-content max-w-none bg-cream overflow-y-auto leading-relaxed text-charcoal">
                      {blogContent ? (
                        <div dangerouslySetInnerHTML={{ __html: resolveImagesForDisplay(blogContent) }} />
                      ) : (
                        <p className="text-neutral-400 italic">No content written yet. Editor is empty.</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Form Buttons */}
                <div className="flex gap-4 pt-4 border-t border-white/40">
                  <button 
                    type="submit"
                    className="px-6 py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-secondary transition-colors shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Sparkles className="w-4 h-4" />
                    {editingBlogId ? "Update Blog" : "Publish Blog"}
                  </button>
                  {editingBlogId && (
                    <button 
                      type="button"
                      onClick={() => {
                        setEditingBlogId(null);
                        setBlogTitle("");
                        setBlogExcerpt("");
                        setBlogContent("");
                        setBlogCover(PRESET_GRADIENTS[0].value);
                        setContentImages({});
                        setBlogSubTab("manage");
                      }}
                      className="px-6 py-3.5 border-2 border-white text-neutral-655 rounded-xl font-bold bg-white hover:bg-neutral-50 transition-colors cursor-pointer active:scale-95"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* Subtab: MANAGE BLOGS */}
          {blogSubTab === "manage" && (
            <div className="bg-white rounded-2xl border-2 border-white shadow-md overflow-hidden animate-fade-in">
              {blogs.length === 0 ? (
                <div className="py-16 text-center">
                  <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-500 font-semibold">No blog posts found.</p>
                  <button 
                    onClick={() => setBlogSubTab("create")} 
                    className="mt-4 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-secondary transition-colors cursor-pointer active:scale-95 shadow-sm"
                  >
                    Create a Post
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-cream-dark border-b border-white/30 text-xs font-bold text-charcoal uppercase tracking-widest">
                        <th className="py-4 px-6">Blog Post</th>
                        <th className="py-4 px-6">Author</th>
                        <th className="py-4 px-6">Category</th>
                        <th className="py-4 px-6">Published Date</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-sm font-medium">
                      {blogs.map((blog) => (
                        <tr key={blog.id} className="hover:bg-cream/40 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              {/* Small cover thumb */}
                              <div className="w-12 h-9 rounded-md overflow-hidden flex-shrink-0 border-2 border-white">
                                {blog.coverPhoto.startsWith("linear-gradient") ? (
                                  <div className="w-full h-full" style={{ background: blog.coverPhoto }} />
                                ) : (
                                  <img src={blog.coverPhoto} alt="" className="w-full h-full object-cover" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-bold text-neutral-900 line-clamp-1">{blog.title}</h4>
                                <p className="text-xs text-neutral-400 line-clamp-1">{blog.excerpt}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <p className="text-neutral-800 font-semibold">{blog.authorName}</p>
                              <p className="text-xs text-neutral-400 font-semibold">{blog.authorDesignation}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs bg-secondary-light text-secondary font-bold">
                              {blog.category}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-neutral-500 text-xs font-semibold">
                            {new Date(blog.createdAt).toLocaleDateString("en-US", {
                              year: "numeric", month: "short", day: "numeric"
                            })}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => handleEditBlogSelect(blog)}
                                className="p-2 hover:bg-cream-dark text-neutral-500 hover:text-primary rounded-lg transition-colors cursor-pointer"
                                title="Edit"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteBlog(blog.id, blog.title)}
                                className="p-2 hover:bg-burgundy-light text-neutral-400 hover:text-burgundy rounded-lg transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Content Section: Testimonials */}
      {activeTab === "testimonials" && (
        <div className="space-y-6">
          {/* Subtabs layout */}
          <div className="flex gap-4 border-b border-white/40 pb-4">
            <button 
              onClick={() => { setTestSubTab("create"); setEditingTestId(null); }}
              className={`pb-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                testSubTab === "create" && !editingTestId
                  ? "border-primary text-primary" 
                  : "border-transparent text-neutral-500 hover:text-primary"
              }`}
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Add Testimonial
            </button>
            {editingTestId && (
              <span className="pb-2 text-sm font-bold border-b-2 border-primary text-primary">
                <Edit3 className="w-4 h-4 inline mr-1" />
                Edit Testimonial
              </span>
            )}
            <button 
              onClick={() => setTestSubTab("manage")}
              className={`pb-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                testSubTab === "manage" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-neutral-500 hover:text-primary"
              }`}
            >
              Manage Testimonials ({testimonials.length})
            </button>
          </div>

          {/* Subtab: ADD/EDIT TESTIMONIAL FORM */}
          {testSubTab === "create" && (
            <div className="bg-white rounded-2xl p-6 sm:p-10 border-2 border-white shadow-md max-w-3xl">
              <h2 className="text-2xl font-serif font-extrabold mb-8 text-charcoal">
                {editingTestId ? "Edit Testimonial" : "New Testimonial"}
              </h2>

              <form onSubmit={handleSaveTestimonial} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">Person Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Dr. Amit Chandra"
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-semibold bg-cream/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">Role / Designation</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Senior Policy Analyst, Center for Civil Society"
                      value={testRole}
                      onChange={(e) => setTestRole(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-semibold bg-cream/10"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">Testimonial Quote</label>
                    <textarea 
                      placeholder="Enter the quote here..."
                      rows={4}
                      value={testQuote}
                      onChange={(e) => setTestQuote(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-semibold resize-none leading-relaxed bg-cream/10"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/40">
                  <button 
                    type="submit"
                    className="px-6 py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-secondary transition-colors shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Sparkles className="w-4 h-4" />
                    {editingTestId ? "Update Testimonial" : "Save Testimonial"}
                  </button>
                  {editingTestId && (
                    <button 
                      type="button"
                      onClick={() => {
                        setEditingTestId(null);
                        setTestName("");
                        setTestRole("");
                        setTestQuote("");
                        setTestSubTab("manage");
                      }}
                      className="px-6 py-3.5 border-2 border-white text-neutral-655 rounded-xl font-bold bg-white hover:bg-neutral-50 transition-colors cursor-pointer active:scale-95"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* Subtab: MANAGE TESTIMONIALS */}
          {testSubTab === "manage" && (
            <div className="bg-white rounded-2xl border-2 border-white shadow-md overflow-hidden animate-fade-in font-sans">
              {testimonials.length === 0 ? (
                <div className="py-16 text-center">
                  <MessageSquare className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-500 font-semibold">No testimonials found.</p>
                  <button 
                    onClick={() => setTestSubTab("create")} 
                    className="mt-4 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-secondary transition-colors cursor-pointer active:scale-95 shadow-sm"
                  >
                    Add a Testimonial
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-cream-dark border-b border-white/30 text-xs font-bold text-charcoal uppercase tracking-widest">
                        <th className="py-4 px-6">Person</th>
                        <th className="py-4 px-6">Quote</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-sm font-medium">
                      {testimonials.map((test) => (
                        <tr key={test.id} className="hover:bg-cream/40 transition-colors">
                          <td className="py-4 px-6 whitespace-nowrap">
                            <div>
                              <p className="font-bold text-neutral-900">{test.name}</p>
                              <p className="text-xs text-neutral-400 font-semibold">{test.role}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <p className="text-neutral-600 line-clamp-2 italic font-semibold text-sm">"{test.quote}"</p>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => handleEditTestSelect(test)}
                                className="p-2 hover:bg-cream-dark text-neutral-500 hover:text-primary rounded-lg transition-colors cursor-pointer"
                                title="Edit"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteTestimonial(test.id, test.name)}
                                className="p-2 hover:bg-burgundy-light text-neutral-400 hover:text-burgundy rounded-lg transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Admin;
