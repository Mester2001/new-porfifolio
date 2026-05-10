/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Code, 
  Terminal, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Download, 
  Cpu, 
  Globe,
  Plus,
  Trash2,
  Edit2,
  ChevronDown,
  Sparkles,
  Send,
  CheckCircle2,
  Award,
  MessageCircle,
  Facebook,
  Instagram,
  Sun,
  Moon,
  Smartphone,
  Search
} from 'lucide-react';
import { askKhalidsAssistant } from './services/geminiService';

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('ar');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Theme logic
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lang, theme]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Shopi GPS",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1600",
      desc: {
        en: "Integrated system for managing and tracking stores with an interactive dashboard.",
        ar: "نظام متكامل لإدارة وتتبع المتاجر مع لوحة تحكم تفاعلية."
      },
      tags: ["Laravel", "GPS API", "MySQL"],
      link: "https://github.com/Mester2001/Shopi-GPS",
      category: "backend"
    },
    {
      id: 2,
      title: "Edraak Project",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1600",
      desc: {
        en: "Interactive educational platform providing high-quality educational content.",
        ar: "منصة تعليمية تفاعلية تقدم محتوى تعليمي عالي الجودة."
      },
      tags: ["Full Stack", "Education", "Laravel"],
      link: "https://github.com/Mester2001/project_edraak",
      category: "fullstack"
    },
    {
      id: 3,
      title: "e-Commerce Store",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600",
      desc: {
        en: "Functional Laravel-based e-commerce website with mobile responsiveness and Stripe.",
        ar: "موقع تجارة إلكترونية متكامل مبني بـ Laravel مع استجابة للهواتف وبوابة دفع Stripe."
      },
      tags: ["Stripe", "OAuth2", "Laravel"],
      link: "https://github.com/Mester2001/eComm-en",
      category: "fullstack"
    }
  ]);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    image: '',
    descEn: '',
    descAr: '',
    tags: '',
    link: '',
    category: 'fullstack'
  });

  const [certifications, setCertifications] = useState([
    { title: "AI for Content Creation", issuer: "Google / Coursera", date: "2026", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400" },
    { title: "AI for Writing and Communicating", issuer: "Google / Coursera", date: "2026", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=400" },
    { title: "Intro to IoT & Digital Transformation", issuer: "Cisco Networking Academy", date: "2026", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400" },
    { title: "Artificial Intelligence Applications", issuer: "Esam Suliman Mustafa Ahmed", date: "2025", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400" },
    { title: "Data Entry Certification", issuer: "Alabagra Training Center", date: "2026", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400" },
    { title: "Version Control", issuer: "Meta / Coursera", date: "2023", image: "https://images.unsplash.com/photo-1556075798-4825dfafd998?auto=format&fit=crop&q=80&w=400" },
    { title: "Intro to Front-End Development", issuer: "Meta / Coursera", date: "2023", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=400" },
    { title: "Programming with JavaScript", issuer: "Meta / Coursera", date: "2023", image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=400" }
  ]);

  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [newCert, setNewCert] = useState({
    title: '',
    issuer: '',
    date: '',
    image: ''
  });

  const experiences = [
    {
      year: '2022 - ' + (lang === 'ar' ? 'الحاضر' : 'Present'),
      title: { ar: 'مطور ويب متقدم', en: 'Lead Web Developer' },
      company: { ar: 'شركة التقنية المتقدمة', en: 'Advanced Tech Co.' },
      desc: { 
        ar: 'قمت بتطوير وتنفيذ تطبيقات ويب متقدمة باستخدام Laravel و React.js. قمت بقيادة فريق تطوير مكون من 4 أفراد لإنشاء منصات إلكترونية متكاملة.',
        en: 'Developed and implemented advanced web applications using Laravel and React.js. Led a development team of 4 to create integrated electronic platforms.'
      },
      color: 'blue'
    },
    {
      year: '2020 - 2022',
      title: { ar: 'مطور ويب', en: 'Web Developer' },
      company: { ar: 'شركة الحلول الرقمية', en: 'Digital Solutions' },
      desc: { 
        ar: 'قمت بتطوير مواقع وتطبيقات ويب متكاملة باستخدام تقنيات مختلفة مثل PHP, JavaScript, و MySQL. ساهمت في تحسين أداء المواقع بنسبة 40%.',
        en: 'Developed integrated websites and web applications using various technologies such as PHP, JavaScript, and MySQL. Contributed to improving site performance by 40%.'
      },
      color: 'green'
    },
    {
      year: '2018 - 2020',
      title: { ar: 'متدرب تطوير ويب', en: 'Web Development Intern' },
      company: { ar: 'أكاديمية البرمجة', en: 'Coding Academy' },
      desc: { 
        ar: 'تدربت على تطوير الويب من خلال العمل على مشاريع حقيقية واكتساب خبرة عملية في HTML, CSS, JavaScript, PHP, وقواعد البيانات.',
        en: 'Trained in web development by working on real projects and gaining practical experience in HTML, CSS, JavaScript, PHP, and databases.'
      },
      color: 'purple'
    }
  ];

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const project = {
      id: projects.length + 1,
      title: newProject.title,
      image: newProject.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600",
      desc: {
        en: newProject.descEn,
        ar: newProject.descAr
      },
      tags: newProject.tags.split(',').map(tag => tag.trim()),
      link: newProject.link,
      category: projectCategories.includes(newProject.category) ? newProject.category : 'fullstack'
    };
    setProjects(prev => [project, ...prev]);
    setIsProjectModalOpen(false);
    setNewProject({
      title: '',
      image: '',
      descEn: '',
      descAr: '',
      tags: '',
      link: '',
      category: 'fullstack'
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject(prev => ({ ...prev, image: reader.result as string }));
        // Clear input value to allow re-uploading same file
        e.target.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCertification = (e: React.FormEvent) => {
    e.preventDefault();
    const cert = {
      title: newCert.title,
      issuer: newCert.issuer,
      date: newCert.date,
      image: newCert.image || "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&q=80&w=400"
    };
    setCertifications(prev => [cert, ...prev]);
    setIsCertModalOpen(false);
    setNewCert({
      title: '',
      issuer: '',
      date: '',
      image: ''
    });
  };

  const handleCertImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCert(prev => ({ ...prev, image: reader.result as string }));
        // Clear input value to allow re-uploading same file
        e.target.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  const projectCategories = ['fullstack', 'backend', 'frontend'];
  const handleAiAsk = async () => {
    if (!aiInput.trim() || isAiLoading) return;
    
    const userMessage = aiInput;
    setAiInput('');
    setAiMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsAiLoading(true);

    try {
      const result = await askKhalidsAssistant(userMessage, lang);
      setAiMessages(prev => [...prev, { role: 'assistant', content: result || '...' }]);
    } catch (err) {
      setAiMessages(prev => [...prev, { role: 'assistant', content: lang === 'ar' ? 'حدث خطأ ما.' : 'An error occurred.' }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)] selection:bg-blue-500/30 font-sans ${lang === 'ar' ? 'font-arabic' : ''}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'glass py-3' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Zap className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tighter">Khalid.</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-text-secondary)]">
            {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:opacity-100 hover:text-blue-400 transition-all cursor-pointer">
                {lang === 'ar' ? translations[lang][item.toLowerCase() as keyof typeof translations.ar] : item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-white/10 transition-all flex items-center justify-center"
              title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            >
              {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-500" />}
            </button>
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="p-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-white/10 transition-all flex items-center justify-center"
            >
              <Globe size={18} />
            </button>
            <button 
              onClick={() => setIsAiModalOpen(true)}
              className="bg-[var(--color-text-primary)] text-[var(--color-bg-base)] px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-black/5"
            >
              <Sparkles size={16} />
              <span className="hidden sm:inline">{lang === 'ar' ? 'اسأل مساعدي' : 'Ask My AI'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-24 mesh-bg">
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
        
        <div className="max-w-4xl mx-auto px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-xs font-mono tracking-widest text-blue-500 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              {lang === 'ar' ? 'متاح لمشاريع جديدة' : 'AVAILABLE FOR NEW PROJECTS'}
            </div>
            
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
              {lang === 'ar' ? (
                <>خالد محمد <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">مطور ويب متكامل</span></>
              ) : (
                <>Khalid Mohamed <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Full Stack Dev</span></>
              )}
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed">
              {lang === 'ar' 
                ? 'أقوم ببناء حلول برمجية حديثة وآمنة باستخدام Laravel و React. متخصص في تحويل الأفكار إلى واقع رقمي مبهر.'
                : 'Building modern, secure web solutions with Laravel and React. Specialized in turning complex ideas into elegant digital realities.'
              }
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <a href="#contact" className="px-8 py-4 bg-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-2xl shadow-blue-500/20">
                {lang === 'ar' ? 'تواصل معي' : 'Let\'s Talk'}
              </a>
              <a 
                href="https://wa.me/249993147029" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-green-500 rounded-2xl font-bold text-lg hover:bg-green-600 transition-all hover:scale-105 shadow-2xl shadow-green-500/20 flex items-center gap-3"
              >
                <MessageCircle size={24} />
                <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
              </a>
              <a href="#projects" className="px-10 py-5 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                {lang === 'ar' ? 'مشاهدة الأعمال' : 'View Work'}
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Stats */}
      <section className="py-6 border-y border-white/5 bg-[var(--color-bg-surface)]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          <StatItem label={lang === 'ar' ? 'سنوات الخبرة' : 'Years Experience'} value="3+" />
          <StatItem label={lang === 'ar' ? 'مشاريع مكتملة' : 'Projects Completed'} value="15+" />
          <StatItem label={lang === 'ar' ? 'شهادات مهنية' : 'Certifications'} value="8+" />
          <StatItem label={lang === 'ar' ? 'عملاء راضون' : 'Happy Clients'} value="100%" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-[var(--color-bg-base)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">
              <span className="block mb-2">{lang === 'ar' ? 'من أنا' : 'About Me'}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {lang === 'ar' ? 'تعرف عليّ أكثر' : 'Get to know me more'}
              </span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-6">
                {lang === 'ar' ? 'مطور ويب متحمس' : 'Passionate Web Developer'}
              </h3>
              <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed text-lg">
                {lang === 'ar' 
                  ? 'أنا خالد، مطور ويب شغوف بإنشاء تجارب رقمية متميزة. أتمتع بخبرة في تطوير تطبيقات الويب باستخدام أحدث التقنيات مثل Laravel و React. أسعى دائمًا لتعلم المزيد وتحسين مهاراتي لتقديم أفضل الحلول التقنية.'
                  : 'I\'m Khalid, a passionate web developer dedicated to creating exceptional digital experiences. I have experience in developing web applications using the latest technologies like Laravel and React. I always strive to learn more and improve my skills to provide the best technical solutions.'
                }
              </p>
              <p className="text-[var(--color-text-secondary)] mb-10 leading-relaxed">
                {lang === 'ar'
                  ? 'أؤمن بأن التكنولوجيا لديها القدرة على تغيير العالم للأفضل، وأسعى جاهدًا لأن أكون جزءًا من هذا التغيير من خلال تطوير حلول برمجية مبتكرة تلبي احتياجات المستخدمين.'
                  : 'I believe technology has the ability to change the world for the better, and I strive to be part of this change by developing innovative software solutions that meet user needs.'
                }
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-text-primary)]">
                      {lang === 'ar' ? 'جودة عالية' : 'High Quality'}
                    </h4>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {lang === 'ar' ? 'أفضل الممارسات' : 'Best Practices'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white transition-all">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-text-primary)]">
                      {lang === 'ar' ? 'أداء عالي' : 'High Performance'}
                    </h4>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {lang === 'ar' ? 'تحميل سريع' : 'Fast Loading'}
                    </p>
                  </div>
                </div>
              </div>
              
              <a href="#contact" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-white hover:opacity-90 transition-all shadow-xl shadow-blue-500/20 gap-3">
                <span>{lang === 'ar' ? 'تواصل معي' : 'Contact Me'}</span>
                <Send size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: lang === 'ar' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <AboutFeatureCard 
                icon={<Code className="text-blue-500" />}
                title={lang === 'ar' ? 'تطوير الويب' : 'Web Development'}
                desc={lang === 'ar' ? 'تصميم وتطوير مواقع وتطبيقات ويب متكاملة' : 'Design and development of integrated websites and apps'}
              />
              <AboutFeatureCard 
                icon={<Smartphone className="text-purple-500" />}
                title={lang === 'ar' ? 'متجاوب' : 'Responsive'}
                desc={lang === 'ar' ? 'تصميم متجاوب يعمل على جميع الأجهزة' : 'Responsive design that works on all devices'}
              />
              <AboutFeatureCard 
                icon={<Zap className="text-green-500" />}
                title={lang === 'ar' ? 'أداء عالي' : 'High Performance'}
                desc={lang === 'ar' ? 'تحسين سرعة التحميل والأداء' : 'Optimizing load speed and performance'}
              />
              <AboutFeatureCard 
                icon={<Search className="text-yellow-500" />}
                title={lang === 'ar' ? 'SEO' : 'SEO'}
                desc={lang === 'ar' ? 'تحسين محركات البحث' : 'Search Engine Optimization'}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 bg-[var(--color-bg-base)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-bold mb-6 tracking-tighter">
              {lang === 'ar' ? 'الخبرات المهنية' : 'Work Experience'}
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              {lang === 'ar' 
                ? 'رحلتي المهنية والخبرات العملية التي اكتسبتها عبر السنين في تطوير الحلول الرقمية.'
                : 'My professional journey and practical experience gained over the years in digital development.'
              }
            </p>
          </div>

          <div className="relative">
            {/* Timeline Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--glass-border)] transform -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                >
                  {/* Content Side */}
                  <div className={`md:w-1/2 w-full ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} mb-8 md:mb-0`}>
                    <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-4 ${
                      exp.color === 'blue' ? 'bg-blue-500/10 text-blue-500' : 
                      exp.color === 'green' ? 'bg-green-500/10 text-green-500' : 
                      'bg-purple-500/10 text-purple-500'
                    }`}>
                      {exp.year}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{exp.title[lang]}</h3>
                    <p className={`font-medium mb-4 ${
                      exp.color === 'blue' ? 'text-blue-500' : 
                      exp.color === 'green' ? 'text-green-500' : 
                      'text-purple-500'
                    }`}>{exp.company[lang]}</p>
                    <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-md ml-auto mr-auto md:ml-0 md:mr-0">
                      {exp.desc[lang]}
                    </p>
                  </div>

                  {/* Dot */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[var(--color-bg-base)] z-10 hidden md:block ${
                    exp.color === 'blue' ? 'bg-blue-500' : 
                    exp.color === 'green' ? 'bg-green-500' : 
                    'bg-purple-500'
                  }`}></div>

                  {/* Spacer */}
                  <div className="md:w-1/2 hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-[var(--color-bg-base)]">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
              <div>
                <h2 className="text-sm font-mono text-blue-500 uppercase tracking-widest mb-4">Portfolio</h2>
                <div className="flex items-center gap-4">
                  <h3 className="text-5xl md:text-6xl font-bold tracking-tighter">
                    {lang === 'ar' ? 'أعمال تم اختيارها' : 'Selected Works'}
                  </h3>
                  <button 
                    onClick={() => setIsProjectModalOpen(true)}
                    className="p-3 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-blue-600/10"
                    title={lang === 'ar' ? 'إضافة مشروع' : 'Add Project'}
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>
            <div className="flex gap-4">
              {['all', 'fullstack', 'backend'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === tab ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-base)]' : 'bg-[var(--glass-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {projects.filter(p => activeTab === 'all' || p.category === activeTab).map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative bg-[var(--color-bg-card)] border border-white/10 rounded-3xl p-0 hover:border-blue-500/50 transition-all overflow-hidden shadow-2xl shadow-black/50"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100"
                    />
                  </div>
                  <div className="p-8 relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-[var(--glass-bg)] rounded-2xl">
                        <Terminal className="text-blue-500" />
                      </div>
                      <a href={project.link} target="_blank" className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                    <h4 className="text-2xl font-bold mb-4">{project.title}</h4>
                    <p className="text-[var(--color-text-secondary)] text-sm mb-6 leading-relaxed">
                      {project.desc[lang]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[10px] uppercase tracking-widest font-bold text-[var(--color-text-secondary)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Skills & Certs */}
      <section id="skills" className="py-32 border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
              <Code className="text-blue-500" />
              {lang === 'ar' ? 'المهارات التقنية' : 'Technical Toolkit'}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <SkillCard label="Laravel / PHP" level="95%" />
              <SkillCard label="React / Next.js" level="88%" />
              <SkillCard label="Express / Node" level="82%" />
              <SkillCard label="MySQL / MongoDB" level="90%" />
              <SkillCard label="Tailwind / CSS" level="92%" />
              <SkillCard label="TypeScript" level="85%" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold flex items-center gap-4">
                <Award className="text-purple-500" />
                {lang === 'ar' ? 'الشهادات' : 'Certifications'}
              </h2>
              <button 
                onClick={() => setIsCertModalOpen(true)}
                className="p-3 bg-purple-600/10 text-purple-400 border border-purple-500/20 rounded-xl hover:bg-purple-600 hover:text-white transition-all shadow-lg shadow-purple-600/10"
                title={lang === 'ar' ? 'إضافة شهادة' : 'Add Certification'}
              >
                <Plus size={24} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex flex-col p-6 bg-[var(--color-bg-card)] border border-[var(--glass-border)] rounded-2xl hover:border-purple-500/30 transition-all group shadow-xl shadow-black/10">
                  <div className="w-full h-32 mb-6 bg-purple-500/5 rounded-xl flex items-center justify-center text-purple-400 overflow-hidden border border-[var(--glass-border)]">
                    {cert.image ? (
                      <img src={cert.image} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <Award size={40} className="opacity-20" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h5 className="font-bold text-sm leading-tight group-hover:text-purple-400 transition-colors uppercase tracking-tight">{cert.title}</h5>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--glass-border)]">
                      <span className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider">{cert.issuer}</span>
                      <span className="text-[10px] font-mono text-purple-500/60 font-bold">{cert.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-24 bg-[var(--color-bg-surface)] border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* About Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Zap size={16} className="text-white" />
                </div>
                <h3 className="text-xl font-bold tracking-tighter">
                  {lang === 'ar' ? 'خالد محمد' : 'Khalid Mohamed'}
                </h3>
              </div>
              <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-md">
                {lang === 'ar' 
                  ? 'مطور ويب متحمس ومهتم بإنشاء تجارب رقمية متميزة. أؤمن بقوة التكنولوجيا في تغيير العالم للأفضل، وأسعى دوماً لتقديم حلول برمجية مبتكرة وعالية الجودة.'
                  : 'Passionate web developer interested in creating exceptional digital experiences. I believe in the power of technology to change the world for the better.'
                }
              </p>
              <div className="flex gap-4 mt-8">
                <FooterSocialLink href="https://github.com/Mester2001" icon={<Github size={20} />} />
                <FooterSocialLink href="https://linkedin.com/in/khalid-mohmmed-087770232" icon={<Linkedin size={20} />} />
                <FooterSocialLink href="#" icon={<Twitter size={20} />} />
                <FooterSocialLink href="https://wa.me/249993147029" icon={<MessageCircle size={20} />} />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-6">
                {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
              </h4>
              <ul className="space-y-4">
                {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item}`} 
                      className="text-[var(--color-text-secondary)] hover:text-blue-500 transition-colors text-sm font-medium"
                    >
                      {lang === 'ar' ? translations.ar[item as keyof typeof translations.ar] : item.charAt(0).toUpperCase() + item.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-6">
                {lang === 'ar' ? 'تواصل معي' : 'Contact Info'}
              </h4>
              <ul className="space-y-4">
                <ContactInfoItem 
                  icon={<Mail size={18} className="text-blue-500" />} 
                  text="mhmh4729@gmail.com" 
                  href="mailto:mhmh4729@gmail.com"
                />
                <ContactInfoItem 
                  icon={<Phone size={18} className="text-blue-500" />} 
                  text="+249 119 740 859" 
                  href="tel:+249119740859"
                />
                <ContactInfoItem 
                  icon={<MapPin size={18} className="text-blue-500" />} 
                  text={lang === 'ar' ? 'الخرطوم، السودان' : 'Khartoum, Sudan'} 
                />
                <ContactInfoItem 
                  icon={<Linkedin size={18} className="text-blue-500" />} 
                  text="LinkedIn" 
                  href="https://linkedin.com/in/khalid-mohmmed-087770232"
                />
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-[var(--glass-border)] text-center">
            <p className="text-[10px] font-mono tracking-widest text-[var(--color-text-secondary)] opacity-50 uppercase">
              {lang === 'ar' 
                ? `© 2026 خالد محمد. جميع الحقوق محفوظة.` 
                : `© 2026 Khalid Mohamed. All rights reserved.`
              }
            </p>
          </div>
        </div>
      </footer>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {isAiModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAiModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-[var(--color-bg-card)] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="font-bold">{lang === 'ar' ? 'مساعد خالد الذكي' : 'Khalid\'s AI Assistant'}</h3>
                </div>
                <button onClick={() => setIsAiModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>

              <div className="p-8 h-[400px] overflow-auto space-y-6 scroll-smooth">
                <div className="bg-[var(--glass-bg)] p-4 rounded-2xl text-sm leading-relaxed border border-[var(--glass-border)] max-w-[85%] self-start">
                  {lang === 'ar' 
                    ? 'أهلاً بك! أنا نسخة ذكية من خالد. يمكنك سؤالي عن خبرته في البرمجة، مهاراته، أو طلب أفكار لمشروعك القادم.'
                    : 'Hello! I\'m Khalid\'s AI assistant. You can ask me about his coding expertise, skills, or even request creative project ideas.'
                  }
                </div>
                
                {aiMessages.map((msg, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl text-sm leading-relaxed border max-w-[85%] ${
                      msg.role === 'user' 
                      ? 'bg-blue-600 text-white ml-auto border-blue-500 rounded-tr-none' 
                      : 'bg-blue-600/10 border-blue-500/20 text-[var(--color-text-primary)] rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </motion.div>
                ))}

                {isAiLoading && (
                  <div className="flex gap-2 p-4 bg-blue-600/5 rounded-2xl w-20 justify-center border border-blue-500/10">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                )}
              </div>

              <div className="p-8 border-t border-[var(--glass-border)] flex gap-4">
                <input 
                  type="text" 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder={lang === 'ar' ? 'اسألني أي شيء...' : 'Ask me anything...'}
                  className="flex-1 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all font-medium"
                  onKeyDown={(e) => e.key === 'Enter' && handleAiAsk()}
                />
                <button 
                  onClick={handleAiAsk}
                  disabled={isAiLoading}
                  className="bg-[var(--color-text-primary)] text-[var(--color-bg-base)] px-8 rounded-xl font-bold hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center disabled:opacity-50"
                >
                  {isAiLoading ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Send size={20} />}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* New Project Modal */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-[var(--color-bg-card)] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-2xl font-bold">{lang === 'ar' ? 'إضافة مشروع جديد' : 'Add New Project'}</h3>
                <button onClick={() => setIsProjectModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>

              <form onSubmit={handleAddProject} className="p-8 space-y-6 max-h-[70vh] overflow-auto">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)]">{lang === 'ar' ? 'صورة المشروع' : 'Project Image'}</label>
                  <div className="relative group cursor-pointer">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full h-40 bg-[var(--glass-bg)] border-2 border-dashed border-[var(--glass-border)] rounded-2xl flex flex-col items-center justify-center group-hover:border-blue-500/50 transition-all overflow-hidden">
                      {newProject.image ? (
                        <img src={newProject.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Plus size={32} className="text-[var(--color-text-secondary)] mb-2" />
                          <span className="text-xs text-[var(--color-text-secondary)]">{lang === 'ar' ? 'انقر لرفع صورة' : 'Click to upload image'}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)]">{lang === 'ar' ? 'العنوان' : 'Title'}</label>
                    <input 
                      required
                      type="text" 
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)]">{lang === 'ar' ? 'التصنيف' : 'Category'}</label>
                    <select 
                      value={newProject.category}
                      onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                      className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 appearance-none"
                    >
                      <option value="fullstack">Full Stack</option>
                      <option value="backend">Backend</option>
                      <option value="frontend">Frontend</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)]">{lang === 'ar' ? 'الوصف (AR)' : 'Description (AR)'}</label>
                  <textarea 
                    required
                    value={newProject.descAr}
                    onChange={(e) => setNewProject({...newProject, descAr: e.target.value})}
                    className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 h-24"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)]">{lang === 'ar' ? 'الوصف (EN)' : 'Description (EN)'}</label>
                  <textarea 
                    required
                    value={newProject.descEn}
                    onChange={(e) => setNewProject({...newProject, descEn: e.target.value})}
                    className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 h-24"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)]">{lang === 'ar' ? 'الوسوم (مفصولة بفواصل)' : 'Tags (comma separated)'}</label>
                    <input 
                      type="text" 
                      value={newProject.tags}
                      onChange={(e) => setNewProject({...newProject, tags: e.target.value})}
                      placeholder="React, Tailwind, Node"
                      className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)]">{lang === 'ar' ? 'الرابط' : 'Link'}</label>
                    <input 
                      type="url" 
                      value={newProject.link}
                      onChange={(e) => setNewProject({...newProject, link: e.target.value})}
                      className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-[var(--color-text-primary)] text-[var(--color-bg-base)] font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-black/10"
                >
                  {lang === 'ar' ? 'إضافة المشروع' : 'Add Project'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* New Certification Modal */}
      <AnimatePresence>
        {isCertModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCertModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[var(--color-bg-card)] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-2xl font-bold">{lang === 'ar' ? 'إضافة شهادة جديدة' : 'Add New Certification'}</h3>
                <button onClick={() => setIsCertModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>

              <form onSubmit={handleAddCertification} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)]">{lang === 'ar' ? 'صورة الشهادة' : 'Certificate Image'}</label>
                  <div className="relative group cursor-pointer">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleCertImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full h-32 bg-[var(--glass-bg)] border-2 border-dashed border-[var(--glass-border)] rounded-2xl flex flex-col items-center justify-center group-hover:border-purple-500/50 transition-all overflow-hidden">
                      {newCert.image ? (
                        <img src={newCert.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Plus size={24} className="text-[var(--color-text-secondary)] mb-2" />
                          <span className="text-xs text-[var(--color-text-secondary)]">{lang === 'ar' ? 'رفع صورة الشهادة' : 'Upload certificate image'}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)]">{lang === 'ar' ? 'اسم الشهادة' : 'Certification Title'}</label>
                  <input 
                    required
                    type="text" 
                    value={newCert.title}
                    onChange={(e) => setNewCert({...newCert, title: e.target.value})}
                    className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)]">{lang === 'ar' ? 'الجهة المانحة' : 'Issuer'}</label>
                  <input 
                    required
                    type="text" 
                    value={newCert.issuer}
                    onChange={(e) => setNewCert({...newCert, issuer: e.target.value})}
                    placeholder="e.g. Google / Coursera"
                    className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)]">{lang === 'ar' ? 'التاريخ' : 'Date'}</label>
                  <input 
                    required
                    type="text" 
                    value={newCert.date}
                    onChange={(e) => setNewCert({...newCert, date: e.target.value})}
                    placeholder="e.g. 2026"
                    className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-[var(--color-text-primary)] text-[var(--color-bg-base)] font-bold rounded-xl hover:bg-purple-600 hover:text-white transition-all shadow-xl shadow-black/10"
                >
                  {lang === 'ar' ? 'إضافة الشهادة' : 'Add Certification'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.a 
        href="https://wa.me/249993147029"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 left-8 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 text-white cursor-pointer group mb-20 sm:mb-0"
      >
        <MessageCircle size={32} />
        <span className={`absolute ${lang === 'ar' ? 'right-full mr-4' : 'left-full ml-4'} whitespace-nowrap bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl`}>
          {lang === 'ar' ? 'تواصل معي على واتساب' : 'Chat on WhatsApp'}
        </span>
      </motion.a>
    </div>
  );
}

function FooterSocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-blue-500 hover:border-blue-500/50 transition-all hover:-translate-y-1"
    >
      {icon}
    </a>
  );
}

function ContactInfoItem({ icon, text, href }: { icon: React.ReactNode, text: string, href?: string }) {
  const content = (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="w-10 h-10 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center group-hover:border-blue-500/50 transition-all">
        {icon}
      </div>
      <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
        {text}
      </span>
    </div>
  );

  return href ? <a href={href}>{content}</a> : <div>{content}</div>;
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="text-center group cursor-default">
      <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 group-hover:text-[var(--color-accent-blue)] transition-colors">{value}</div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-secondary)] opacity-50">{label}</div>
    </div>
  );
}

function SkillCard({ label, level }: { label: string, level: string }) {
  return (
    <div className="p-6 bg-[var(--color-bg-card)] border border-[var(--glass-border)] rounded-2xl group hover:border-[var(--color-accent-blue)]/30 transition-all shadow-xl shadow-black/20">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-sm tracking-tight">{label}</span>
        <span className="text-[10px] font-mono text-[var(--color-text-secondary)]">{level}</span>
      </div>
      <div className="h-1 bg-[var(--glass-bg)] rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: level }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="h-full bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-purple)]"
        />
      </div>
    </div>
  );
}

function AboutFeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-[var(--glass-bg)] p-8 rounded-3xl border border-[var(--glass-border)] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all group">
      <div className="w-14 h-14 bg-[var(--color-bg-base)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-3">{title}</h4>
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{desc}</p>
    </div>
  );
}

function SocialLink({ href, icon, label }: { href: string, icon: React.ReactNode, label?: string }) {
  return (
    <a 
      href={href} 
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-16 h-16 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl flex items-center justify-center hover:bg-white/10 hover:border-blue-500/50 hover:text-blue-400 transition-all hover:-translate-y-2"
    >
      {icon}
      {label && (
        <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[var(--color-text-primary)] text-[var(--color-bg-base)] text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">
          {label}
        </span>
      )}
    </a>
  );
}

const translations = {
  ar: {
    home: "الرئيسية",
    about: "عني",
    skills: "المهارات",
    experience: "الخبرات",
    projects: "المشاريع",
    contact: "اتصل بي"
  }
};

