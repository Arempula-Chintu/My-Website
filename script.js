/* ==========================================================================
   CHINTU AREMPULA PORTFOLIO CORE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. MOBILE MENU TOGGLE
    // ==========================================================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // 2. SCROLL EVENTS & NAVBAR RESIZE & SCROLL SPY
    // ==========================================================================
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header shrink
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Spy active state
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 120) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // 3. TYPING EFFECT (HERO SUBTITLE)
    // ==========================================================================
    const typedTextSpan = document.getElementById('typed-text');
    const roles = [
        "AWS Cloud Systems.",
        "CI/CD Pipelines.",
        "Infrastructure as Code.",
        "DevOps Automations."
    ];
    const typingSpeed = 100;
    const erasingSpeed = 60;
    const newRoleDelay = 2000; // Delay between roles
    let roleIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < roles[roleIndex].length) {
            typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newRoleDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, typingSpeed + 500);
        }
    }

    if (typedTextSpan) {
        setTimeout(type, 1000);
    }

    // ==========================================================================
    // 4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================================================
    // 5. INTERACTIVE AWS CLOUD SHELL TERMINAL SIMULATOR
    // ==========================================================================
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutputs = document.getElementById('terminalOutputs');
    const terminalBody = document.getElementById('terminalBody');
    const shortcutButtons = document.querySelectorAll('.shortcut-btn');

    let commandHistory = [];
    let historyIndex = -1;

    // ANSI/Styled Terminal output helper
    function printLine(text, type = 'cmd-output', delay = 0) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = `terminal-line ${type}`;
                line.innerHTML = text;
                terminalOutputs.appendChild(line);
                terminalBody.scrollTop = terminalBody.scrollHeight;
                resolve();
            }, delay);
        });
    }

    // Process entered commands
    async function executeCommand(cmdStr) {
        cmdStr = cmdStr.trim();
        if (!cmdStr) return;

        // Save to command history
        commandHistory.push(cmdStr);
        historyIndex = commandHistory.length;

        // Print entered command prompt
        await printLine(`<span class="terminal-prompt">chintu@aws-cloud-shell:~$</span> ${cmdStr}`);

        const parts = cmdStr.split(' ');
        const mainCmd = parts[0].toLowerCase();

        switch (mainCmd) {
            case 'help':
                await printLine('Available commands:', 'info');
                await printLine('  <span class="text-accent">neofetch</span>    Display system statistics and skills overview');
                await printLine('  <span class="text-accent">skills</span>      Show list of AWS & DevOps engineering capabilities');
                await printLine('  <span class="text-accent">projects</span>    Summarize completed cloud architecture builds');
                await printLine('  <span class="text-accent">deploy</span>      Simulate live Terraform provisioning of AWS setup');
                await printLine('  <span class="text-accent">about</span>       View professional summary block');
                await printLine('  <span class="text-accent">contact</span>     List target contact vectors (email, phone, etc)');
                await printLine('  <span class="text-accent">clear</span>       Wipe display logs from virtual screen');
                break;

            case 'clear':
                terminalOutputs.innerHTML = '';
                break;

            case 'neofetch':
                const awsLogo = `
   <span class="text-orange">.      .</span>      <span class="text-accent">OS:</span> Chintu-Linux v2.6.15-aws
  <span class="text-orange">.:.    .:.</span>     <span class="text-accent">Kernel:</span> AWS Cloud-shell environment
 <span class="text-orange">.:::.  .:::.</span>    <span class="text-accent">Uptime:</span> 3 days, 4 hours
<span class="text-orange">.::::.  .::::.</span>   <span class="text-accent">Shell:</span> bash 5.1.16
<span class="text-orange">:======::======:</span>  <span class="text-accent">VCPU:</span> AWS EC2 t3.micro (2 VCPUs)
 <span class="text-orange">'::::'  '::::'</span>   <span class="text-accent">Memory:</span> 986MiB / 2048MiB
  <span class="text-orange">'::'    '::'</span>    <span class="text-accent">Practices:</span> Infrastructure Automation, CI/CD
   <span class="text-orange">'      '</span>      <span class="text-accent">Focus:</span> AWS cloud configuration & Scaling
`;
                await printLine(awsLogo, 'cmd-output');
                break;

            case 'skills':
                await printLine('--- Technical Skills Inventory ---', 'info');
                await printLine('<span class="text-orange">[Cloud Platform]</span> EC2, S3, VPC, IAM, RDS, Lambda, CloudWatch, Route 53, CloudFront, ALB, ASG, CloudFormation');
                await printLine('<span class="text-accent">[DevOps & CI/CD]</span> Git/GitHub, Docker, Jenkins (basics), GitHub Actions, Terraform (basics), Linux (Ubuntu/CentOS)');
                await printLine('<span class="text-accent">[Programming & DB]</span> Shell scripting (Bash), SQL databases');
                await printLine('<span class="text-accent">[Networking]</span> TCP/IP, DNS routing, Subnetting parameters, Load Balancing');
                break;

            case 'projects':
                await printLine('--- Completed Projects ---', 'info');
                await printLine('<span class="text-orange">1. Scalable Web App Hosting on AWS</span>');
                await printLine('   Deployed 3-tier app (EC2/RDS/S3) within isolated VPC subnets. Wired Application Load Balancer and Auto Scaling for failover and auto-scaling.');
                await printLine('<span class="text-orange">2. Static Website Hosting & CI/CD Pipeline</span>');
                await printLine('   Arranged zero-maintenance hosting on S3/CloudFront with automatic deployments using GitHub Actions. Domain registered on Route 53 + HTTPS via ACM.');
                break;

            case 'about':
                await printLine('--- Professional Summary ---', 'info');
                await printLine('Motivated computer science graduate with active hands-on practice building resilient web deployments on AWS.');
                await printLine('Seeking to join a high-functioning cloud operations or DevOps engineering team to implement reliable IaC blueprints, optimize release pipelines, and secure storage layers.');
                break;

            case 'contact':
                await printLine('--- Contact Channels ---', 'info');
                await printLine('📫 Email:   <a href="mailto:arempulachintu09@gmail.com" class="text-accent">arempulachintu09@gmail.com</a>');
                await printLine('📞 Phone:   <a href="tel:+919515979011" class="text-accent">+91-9515979011</a>');
                await printLine('📍 Place:   Hyderabad, Telangana');
                await printLine('🔗 LinkedIn: <a href="https://linkedin.com/in/chintu-arempula" target="_blank" class="text-accent">linkedin.com/in/chintu-arempula</a>');
                break;

            case 'deploy':
                // Disable input during deployment simulation
                terminalInput.disabled = true;
                
                await printLine('🚀 Starting Terraform provision deployment cycle...', 'warning');
                await printLine('Initializing AWS CLI auth profile: <i>chintu-prod</i>... [OK]', 'cmd-output', 600);
                await printLine('Verifying local state files with secure Remote backend (S3)... [OK]', 'cmd-output', 500);
                await printLine('Validating resource syntax tree for target deployment... [OK]', 'cmd-output', 400);
                await printLine('Applying plan: <b>12 resources to create</b>, 0 update, 0 destroy.', 'info', 600);
                
                await printLine('[1/6] Provisioning network envelope: <b>VPC vpc-02e0c (10.0.0.0/16)</b>...', 'cmd-output', 800);
                await printLine('  - Subnet Public-A (10.0.1.0/24) created in us-east-1a... [OK]', 'cmd-output', 300);
                await printLine('  - Subnet Private-A (10.0.2.0/24) created in us-east-1a... [OK]', 'cmd-output', 300);
                await printLine('  - Gateway IGW (igw-08a9f) attached to public route tables... [OK]', 'cmd-output', 400);
                
                await printLine('[2/6] Configuring access boundaries: <b>Security Groups & ACLs</b>...', 'cmd-output', 700);
                await printLine('  - Port 80/443 ingress authorized for ALB subnet security group... [OK]', 'cmd-output', 300);
                
                await printLine('[3/6] Deploying relational store: <b>Amazon RDS MySQL instance</b>...', 'cmd-output', 900);
                await printLine('  - Database subsystem live in private DB subnet group: <i>db.t3.micro</i>... [ACTIVE]', 'success', 400);
                
                await printLine('[4/6] Bootstrapping compute nodes: <b>Auto Scaling Group (ASG)</b>...', 'cmd-output', 800);
                await printLine('  - Initializing EC2 app-srv-1 inside us-east-1a... [RUNNING]', 'cmd-output', 400);
                await printLine('  - Initializing EC2 app-srv-2 inside us-east-1b... [RUNNING]', 'cmd-output', 400);
                
                await printLine('[5/6] Directing entry point traffic: <b>Application Load Balancer (ALB)</b>...', 'cmd-output', 750);
                await printLine('  - ALB DNS listener successfully binded to target group health monitors... [ACTIVE]', 'success', 300);
                
                await printLine('[6/6] Launching deployment update pipeline via GitHub Actions sync...', 'cmd-output', 900);
                await printLine('  - Syncing static S3 objects... 100% complete.', 'success', 400);
                await printLine('  - invalidating CloudFront distribution edge nodes... [OK]', 'success', 500);
                await printLine('  - Custom domain binding via Route 53 A record + ACM SSL TLS... [OK]', 'success', 600);
                
                await printLine('🎉 Deployment completed successfully! All resources online.', 'success', 600);
                await printLine('🌐 Portfolio site is live at: <a href="http://chintu-portfolio.aws" target="_blank" class="text-accent">http://chintu-portfolio.aws</a>', 'info', 200);
                
                terminalInput.disabled = false;
                terminalInput.focus();
                break;

            default:
                await printLine(`bash: command not found: ${mainCmd}. Type <span class="text-accent">help</span> for commands.`, 'error');
                break;
        }

        // Auto scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    if (terminalInput) {
        // Intercept enter press
        terminalInput.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value;
                terminalInput.value = '';
                await executeCommand(cmd);
            }
            
            // History navigation via arrow keys
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = commandHistory[historyIndex];
                }
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    terminalInput.value = '';
                }
            }
        });

        // Click handler for shortcuts
        shortcutButtons.forEach(btn => {
            btn.addEventListener('click', async () => {
                const cmd = btn.getAttribute('data-cmd');
                if (terminalInput.disabled) return;
                await executeCommand(cmd);
            });
        });
        
        // Terminal area click focus input
        terminalBody.addEventListener('click', () => {
            if (!terminalInput.disabled) {
                terminalInput.focus();
            }
        });
    }

    // ==========================================================================
    // 6. CONTACT FORM SUBMISSION HANDLER
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            
            // Toggle loading UI
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            formFeedback.style.display = 'none';

            // Extract values
            const name = document.getElementById('formName').value;
            const email = document.getElementById('formEmail').value;
            const subject = document.getElementById('formSubject').value;
            const message = document.getElementById('formMessage').value;

            // Mock network transmission wait
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;

                if (name && email && subject && message) {
                    // Success display
                    formFeedback.className = "form-feedback success";
                    formFeedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your message has been sent successfully. Chintu will respond to you shortly at <i>${email}</i>.`;
                    contactForm.reset();
                } else {
                    // Fail display
                    formFeedback.className = "form-feedback error";
                    formFeedback.innerHTML = "<strong>Error!</strong> Please fill in all required inputs to send.";
                }
            }, 1800);
        });
    }

    // Focus terminal input initially if viewport is in terminal section
    const observerFocus = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !terminalInput.disabled) {
                terminalInput.focus();
            }
        });
    }, { threshold: 0.5 });
    
    if (terminalBody) {
        observerFocus.observe(terminalBody);
    }
});
