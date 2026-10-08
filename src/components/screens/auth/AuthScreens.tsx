import React, { useEffect, useState } from 'react';
import { LanguageCode, ScreenId } from '../../../types/navigation';
import { PublicNavbar } from '../../navigation/PublicNavbar';
import { BrandLogo, TR_THEINT_LOGO_URL } from '../../navigation/BrandLogo';

interface AuthScreensProps {
  screenId: 'AUTH-01-LOGIN' | 'AUTH-02-REGISTER' | 'AUTH-03-VERIFY-EMAIL';
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onNavigateScreen: (screenId: ScreenId) => void;
  showSpecGuides?: boolean;
}

type RegisterQaState =
  | 'default'
  | 'progress'
  | 'validation_errors'
  | 'conflict_email'
  | 'submitting'
  | 'success';

type VerifyQaState = 'waiting' | 'resend' | 'verified' | 'expired' | 'failed';

type LoginQaState =
  | 'default'
  | 'validation-error'
  | 'invalid-creds'
  | 'unverified'
  | 'submitting'
  | 'dispatch';

export const AuthScreens: React.FC<AuthScreensProps> = ({
  screenId,
  language,
  onLanguageChange,
  onNavigateScreen,
  showSpecGuides = false,
}) => {
  // =========================================================================
  // 1. REGISTER SCREEN STATE (AUTH-01 Canonical)
  // =========================================================================
  const [regState, setRegState] = useState<RegisterQaState>('default');
  const [regFullname, setRegFullname] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regTerms, setRegTerms] = useState(false);
  const [showRegPwd, setShowRegPwd] = useState(false);
  const [showRegConfirmPwd, setShowRegConfirmPwd] = useState(false);

  const applyRegisterQaState = (state: RegisterQaState) => {
    setRegState(state);
    switch (state) {
      case 'default':
        setRegFullname('');
        setRegEmail('');
        setRegPhone('');
        setRegPassword('');
        setRegConfirmPassword('');
        setRegTerms(false);
        break;
      case 'progress':
        setRegFullname('Htet Aung Kyaw');
        setRegEmail('htetaung.k@theintenglish.edu');
        setRegPhone('09798123456');
        setRegPassword('MandalaPass99');
        setRegConfirmPassword('MandalaPass99');
        setRegTerms(true);
        break;
      case 'validation_errors':
        setRegFullname('');
        setRegEmail('invalid-email-format');
        setRegPhone('');
        setRegPassword('123');
        setRegConfirmPassword('abc');
        setRegTerms(false);
        break;
      case 'conflict_email':
        setRegFullname('Su Myat Noe');
        setRegEmail('sumyatnoe@example.com');
        setRegPhone('09450098765');
        setRegPassword('OxfordAcad!2024');
        setRegConfirmPassword('OxfordAcad!2024');
        setRegTerms(true);
        break;
      case 'submitting':
        setRegFullname('Maung Thein Htike');
        setRegEmail('student@theintenglish.edu');
        setRegPhone('09250123987');
        setRegPassword('RangoonBridge#88');
        setRegConfirmPassword('RangoonBridge#88');
        setRegTerms(true);
        break;
      case 'success':
        setRegFullname('Maung Thein Htike');
        setRegEmail('student@theintenglish.edu');
        setRegPhone('09250123987');
        setRegPassword('RangoonBridge#88');
        setRegConfirmPassword('RangoonBridge#88');
        setRegTerms(true);
        break;
    }
  };

  const getPasswordStrength = (val: string) => {
    if (!val || val.length === 0) {
      return {
        level: 0,
        label: 'Security Level',
        labelClass: 'text-xs text-[#534247] ml-2 text-right font-medium',
        bar1: 'bg-[#f5e4e7]',
        bar2: 'bg-[#f5e4e7]',
        bar3: 'bg-[#f5e4e7]',
      };
    }
    if (val.length < 6) {
      return {
        level: 1,
        label: 'Weak',
        labelClass: 'text-xs text-[#ba1a1a] font-bold ml-2 text-right',
        bar1: 'bg-[#ba1a1a]',
        bar2: 'bg-[#f5e4e7]',
        bar3: 'bg-[#f5e4e7]',
      };
    }
    if (val.length < 9 || !/\d/.test(val)) {
      return {
        level: 2,
        label: 'Good',
        labelClass: 'text-xs text-[#006685] font-bold ml-2 text-right',
        bar1: 'bg-[#81d4fa]',
        bar2: 'bg-[#81d4fa]',
        bar3: 'bg-[#f5e4e7]',
      };
    }
    return {
      level: 3,
      label: 'Institutional Grade',
      labelClass: 'text-xs text-[#1b5e20] font-bold ml-2 text-right',
      bar1: 'bg-[#a5d6a7]',
      bar2: 'bg-[#a5d6a7]',
      bar3: 'bg-[#a5d6a7]',
    };
  };

  const pwdStrength = getPasswordStrength(regPassword);
  const passwordsMatch =
    regConfirmPassword.length > 0 && regPassword === regConfirmPassword;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyRegisterQaState('submitting');
    setTimeout(() => {
      applyRegisterQaState('success');
    }, 1500);
  };

  // =========================================================================
  // 2. EMAIL VERIFICATION STATE (AUTH-02 Guard)
  // =========================================================================
  const [verifyState, setVerifyState] = useState<VerifyQaState>('waiting');
  const [resendSpinner, setResendSpinner] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const triggerResendAction = () => {
    setVerifyState('resend');
    setResendSpinner(true);
    setTimeout(() => {
      setResendSpinner(false);
      setCountdown(59);
    }, 700);
  };

  const switchVerifyState = (stateName: VerifyQaState) => {
    setVerifyState(stateName);
    if (stateName === 'resend') {
      triggerResendAction();
    }
  };

  // =========================================================================
  // 3. LOGIN SCREEN STATE (Screen State Inspector)
  // =========================================================================
  const [loginState, setLoginState] = useState<LoginQaState>('dispatch');
  const [loginEmail, setLoginEmail] = useState('admin.theint@theint-academy.edu');
  const [loginPassword, setLoginPassword] = useState('SecureAdminAccess2024!');
  const [showLoginPwd, setShowLoginPwd] = useState(false);

  const applyLoginQaState = (stateKey: LoginQaState) => {
    setLoginState(stateKey);
    switch (stateKey) {
      case 'default':
        setLoginEmail('');
        setLoginPassword('');
        break;
      case 'validation-error':
        setLoginEmail('invalid.academic-format');
        setLoginPassword('123');
        break;
      case 'invalid-creds':
        setLoginEmail('sarah.lin@theint-academy.edu');
        setLoginPassword('wrongpassword');
        break;
      case 'unverified':
        setLoginEmail('kyaw.zayar@student.theint.edu');
        setLoginPassword('VerifiedPass2024!');
        break;
      case 'submitting':
        setLoginEmail('theint.instructor@theint-academy.edu');
        setLoginPassword('ValidAcademicPassword123#');
        break;
      case 'dispatch':
        setLoginEmail('admin.theint@theint-academy.edu');
        setLoginPassword('SecureAdminAccess2024!');
        break;
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyLoginQaState('submitting');
    setTimeout(() => {
      applyLoginQaState('dispatch');
    }, 1200);
  };

  const activeAuthMap: Record<
    AuthScreensProps['screenId'],
    'Login' | 'Register' | 'Email Verification'
  > = {
    'AUTH-01-LOGIN': 'Login',
    'AUTH-02-REGISTER': 'Register',
    'AUTH-03-VERIFY-EMAIL': 'Email Verification',
  };

  return (
    <div className="bg-[#fff8f8] font-['Nunito_Sans'] text-[#22191b] antialiased min-h-screen flex flex-col justify-between selection:bg-[#ffd9e2] selection:text-[#722544]">
      {/* Top Card Navbar */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 pt-6 sm:pt-8">
        <PublicNavbar
          variant="card"
          activeNav={null}
          activeAuth={activeAuthMap[screenId]}
          language={language}
          onLanguageChange={onLanguageChange}
          onNavigateScreen={onNavigateScreen}
          showSpecGuides={showSpecGuides}
        />
      </div>

      {/* =================================================================== */}
      {/* SCREEN 1: REGISTER (AUTH-02-REGISTER)                               */}
      {/* =================================================================== */}
      {screenId === 'AUTH-02-REGISTER' && (
        <main className="w-full bg-[#fff8f8] flex-grow flex items-center justify-center py-10 sm:py-16">
          <div className="flex flex-col w-full items-center justify-center px-4 sm:px-6">
            <div className="w-full max-w-xl mx-auto flex flex-col items-center">
              {/* State Simulation Toolbar for Canonical QA */}
              <div className="w-full mb-6 bg-white/90 backdrop-blur-sm p-3.5 rounded-3xl border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.08)]">
                <div className="flex items-center justify-between px-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">
                      science
                    </span>
                    <span className="font-['Quicksand'] font-bold text-xs uppercase tracking-wider text-[#534247]">
                      Screen States QA Bar
                    </span>
                  </div>
                  <span className="font-['Quicksand'] font-semibold text-xs text-[#964261] bg-[#fff0f2] px-2.5 py-0.5 rounded-full border border-[#f5e4e7]">
                    AUTH-01 Canonical
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 font-['Quicksand']">
                  {(
                    [
                      { key: 'default', label: 'Default' },
                      { key: 'progress', label: 'Active' },
                      { key: 'validation_errors', label: 'Errors' },
                      { key: 'conflict_email', label: 'Duplicate' },
                      { key: 'submitting', label: 'Loading' },
                      { key: 'success', label: 'Success' },
                    ] as { key: RegisterQaState; label: string }[]
                  ).map((item) => {
                    const isActive = regState === item.key;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => applyRegisterQaState(item.key)}
                        className={`py-1.5 px-2 rounded-full text-xs font-bold text-center transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#f48fb1] text-white shadow-xs'
                            : 'text-[#534247] hover:bg-[#fff0f2] hover:text-[#22191b]'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Registration Card */}
              <div className="w-full bg-white rounded-3xl border border-[#fbeaec] shadow-[0_8px_30px_rgba(244,143,177,0.12)] p-6 sm:p-10 relative overflow-hidden transition-all duration-300">
                {/* Decorative Pastel Rainbow Ambient Glow */}
                <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#81d4fa]/20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-[#f48fb1]/20 blur-3xl pointer-events-none" />

                {/* Header with Teacher Theint Brand Avatar */}
                <div className="flex flex-col items-center text-center mb-6 relative z-10">
                  <div className="relative mb-3 group">
                    <img
                      src={TR_THEINT_LOGO_URL}
                      alt="Teacher Theint English"
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-[0_4px_12px_rgba(244,143,177,0.3)] ring-4 ring-[#f48fb1]/30"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#a5d6a7] border-2 border-white shadow-2xs" title="Academy Active" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-xs font-['Quicksand'] font-bold text-[#964261] mb-2 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#f48fb1]" />
                    <span>Pastel Rainbow Academy Enrollment</span>
                  </div>
                  <h1 className="font-['Quicksand'] font-bold text-2xl sm:text-3xl text-[#22191b] tracking-tight">
                    Create your Student Account
                  </h1>
                  <p className="font-['Nunito_Sans'] text-sm text-[#534247] mt-1 max-w-md">
                    Join Teacher Theint English to begin your personalized academic language journey.
                  </p>
                </div>

                {/* State D: Duplicate Email Conflict Error */}
                {regState === 'conflict_email' && (
                  <div
                    aria-live="assertive"
                    className="mb-6 p-4 rounded-2xl bg-[#ffdad6]/70 border border-[#ba1a1a]/30 text-[#93000a] flex items-start gap-3 shadow-xs transition-all duration-300"
                    role="alert"
                  >
                    <span className="material-symbols-outlined text-[20px] text-[#ba1a1a] shrink-0 mt-0.5">
                      error
                    </span>
                    <div className="flex flex-col text-xs sm:text-sm">
                      <span className="font-['Quicksand'] font-bold text-[#ba1a1a]">
                        Email Already Registered
                      </span>
                      <p className="text-[#93000a] mt-0.5">
                        An account with this email already exists in the student registry. Please{' '}
                        <button
                          type="button"
                          onClick={() => onNavigateScreen('AUTH-01-LOGIN')}
                          className="underline font-bold hover:text-[#ba1a1a] transition-colors cursor-pointer"
                        >
                          log in instead
                        </button>{' '}
                        or reset your password.
                      </p>
                    </div>
                  </div>
                )}

                {/* State F: Success Transition Banner */}
                {regState === 'success' && (
                  <div
                    aria-live="polite"
                    className="mb-6 p-4 rounded-2xl bg-[#e8f5e9] border border-[#a5d6a7] text-[#1b5e20] shadow-xs transition-all duration-300"
                    role="status"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#a5d6a7] text-[#1b5e20] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs font-bold">
                        <span className="material-symbols-outlined text-[18px]">check</span>
                      </div>
                      <div className="flex flex-col w-full text-xs sm:text-sm">
                        <span className="font-['Quicksand'] font-bold text-[#1b5e20]">
                          Account Created Successfully!
                        </span>
                        <p className="text-[#2e7d32] mt-0.5">
                          Welcome to the Academy! Redirecting to email verification portal (student@theintenglish.edu)...
                        </p>
                        <div className="w-full bg-[#c8e6c9] h-2 rounded-full mt-3 overflow-hidden">
                          <div className="bg-[#43a047] h-full w-2/3 rounded-full animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Registration Form */}
                <form
                  className="flex flex-col gap-4 font-['Nunito_Sans']"
                  noValidate
                  onSubmit={handleRegisterSubmit}
                >
                  {/* Field 1: Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-['Quicksand'] font-bold text-xs sm:text-sm text-[#22191b] flex items-center justify-between"
                      htmlFor="reg-fullname"
                    >
                      <span>
                        Full Name <span className="text-[#ba1a1a]">*</span>
                      </span>
                      <span className="font-['Nunito_Sans'] text-xs text-[#534247] font-normal">
                        Official Legal Name
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="reg-fullname"
                        type="text"
                        value={regFullname}
                        onChange={(e) => setRegFullname(e.target.value)}
                        placeholder="e.g., Maung Thein Htike"
                        className={`w-full h-11 px-4 rounded-2xl bg-[#fff8f8] text-[#22191b] text-sm placeholder:text-[#867277] border transition-all focus:bg-white focus:outline-none focus:border-[#f48fb1] focus:ring-2 focus:ring-[#f48fb1]/20 ${
                          regState === 'validation_errors'
                            ? 'border-[#ba1a1a] ring-1 ring-[#ba1a1a]'
                            : 'border-[#f5e4e7]'
                        }`}
                        required
                      />
                    </div>
                    {regState === 'validation_errors' && (
                      <span className="text-xs text-[#ba1a1a] flex items-center gap-1 font-semibold mt-0.5" role="alert">
                        <span className="material-symbols-outlined text-[14px]">info</span> Please enter your legal full name.
                      </span>
                    )}
                  </div>

                  {/* Field 2: Email Address */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-['Quicksand'] font-bold text-xs sm:text-sm text-[#22191b] flex items-center justify-between"
                      htmlFor="reg-email"
                    >
                      <span>
                        Email Address <span className="text-[#ba1a1a]">*</span>
                      </span>
                      <span className="font-['Nunito_Sans'] text-xs text-[#534247] font-normal">
                        Student ID login
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="reg-email"
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="student@theintenglish.edu"
                        className={`w-full h-11 px-4 pr-10 rounded-2xl bg-[#fff8f8] text-[#22191b] text-sm placeholder:text-[#867277] border transition-all focus:bg-white focus:outline-none focus:border-[#f48fb1] focus:ring-2 focus:ring-[#f48fb1]/20 ${
                          regState === 'validation_errors' || regState === 'conflict_email'
                            ? 'border-[#ba1a1a] ring-1 ring-[#ba1a1a]'
                            : 'border-[#f5e4e7]'
                        }`}
                        required
                      />
                      <span className="absolute right-3.5 top-3 material-symbols-outlined text-[18px] text-[#867277] pointer-events-none">
                        mail
                      </span>
                    </div>
                    {regState === 'validation_errors' && (
                      <span className="text-xs text-[#ba1a1a] flex items-center gap-1 font-semibold mt-0.5" role="alert">
                        <span className="material-symbols-outlined text-[14px]">info</span> Please provide a valid email.
                      </span>
                    )}
                  </div>

                  {/* Field 3: Phone Number */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-['Quicksand'] font-bold text-xs sm:text-sm text-[#22191b] flex items-center justify-between"
                      htmlFor="reg-phone"
                    >
                      <span>
                        Phone Number <span className="text-[#ba1a1a]">*</span>
                      </span>
                      <span className="font-['Nunito_Sans'] text-xs text-[#534247] font-normal">SMS alerts</span>
                    </label>
                    <div className="relative">
                      <input
                        id="reg-phone"
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="09xxxxxxxxx or international (+95)"
                        className={`w-full h-11 px-4 pr-10 rounded-2xl bg-[#fff8f8] text-[#22191b] text-sm placeholder:text-[#867277] border transition-all focus:bg-white focus:outline-none focus:border-[#f48fb1] focus:ring-2 focus:ring-[#f48fb1]/20 ${
                          regState === 'validation_errors'
                            ? 'border-[#ba1a1a] ring-1 ring-[#ba1a1a]'
                            : 'border-[#f5e4e7]'
                        }`}
                        required
                      />
                      <span className="absolute right-3.5 top-3 material-symbols-outlined text-[18px] text-[#867277] pointer-events-none">
                        phone
                      </span>
                    </div>
                    {regState === 'validation_errors' && (
                      <span className="text-xs text-[#ba1a1a] flex items-center gap-1 font-semibold mt-0.5" role="alert">
                        <span className="material-symbols-outlined text-[14px]">info</span> Phone number is required for cohort enrollment.
                      </span>
                    )}
                  </div>

                  {/* Field 4: Password with Eye Toggle */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-['Quicksand'] font-bold text-xs sm:text-sm text-[#22191b] flex items-center justify-between"
                      htmlFor="reg-password"
                    >
                      <span>
                        Create Password <span className="text-[#ba1a1a]">*</span>
                      </span>
                      <span className="font-['Nunito_Sans'] text-xs text-[#534247] font-normal">
                        Min. 8 characters
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="reg-password"
                        type={showRegPwd ? 'text' : 'password'}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className={`w-full h-11 pl-4 pr-10 rounded-2xl bg-[#fff8f8] text-[#22191b] text-sm placeholder:text-[#867277] border transition-all focus:bg-white focus:outline-none focus:border-[#f48fb1] focus:ring-2 focus:ring-[#f48fb1]/20 ${
                          regState === 'validation_errors'
                            ? 'border-[#ba1a1a] ring-1 ring-[#ba1a1a]'
                            : 'border-[#f5e4e7]'
                        }`}
                        required
                      />
                      <button
                        aria-label="Toggle password visibility"
                        type="button"
                        onClick={() => setShowRegPwd((prev) => !prev)}
                        className="absolute right-2.5 top-2.5 text-[#534247] hover:text-[#f48fb1] p-1 focus:outline-none cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showRegPwd ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    {/* Password Strength Indicator */}
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className={`h-1.5 flex-1 rounded-full transition-colors ${pwdStrength.bar1}`} />
                      <div className={`h-1.5 flex-1 rounded-full transition-colors ${pwdStrength.bar2}`} />
                      <div className={`h-1.5 flex-1 rounded-full transition-colors ${pwdStrength.bar3}`} />
                      <span className={pwdStrength.labelClass}>{pwdStrength.label}</span>
                    </div>
                  </div>

                  {/* Field 5: Confirm Password */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-['Quicksand'] font-bold text-xs sm:text-sm text-[#22191b] flex items-center justify-between"
                      htmlFor="reg-confirm-password"
                    >
                      <span>
                        Confirm Password <span className="text-[#ba1a1a]">*</span>
                      </span>
                      {passwordsMatch && (
                        <span className="text-xs text-[#1b5e20] font-bold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span> Passwords match
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        id="reg-confirm-password"
                        type={showRegConfirmPwd ? 'text' : 'password'}
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className={`w-full h-11 pl-4 pr-10 rounded-2xl bg-[#fff8f8] text-[#22191b] text-sm placeholder:text-[#867277] border transition-all focus:bg-white focus:outline-none focus:border-[#f48fb1] focus:ring-2 focus:ring-[#f48fb1]/20 ${
                          regState === 'validation_errors'
                            ? 'border-[#ba1a1a] ring-1 ring-[#ba1a1a]'
                            : 'border-[#f5e4e7]'
                        }`}
                        required
                      />
                      <button
                        aria-label="Toggle confirm password visibility"
                        type="button"
                        onClick={() => setShowRegConfirmPwd((prev) => !prev)}
                        className="absolute right-2.5 top-2.5 text-[#534247] hover:text-[#f48fb1] p-1 focus:outline-none cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showRegConfirmPwd ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    {regState === 'validation_errors' && !passwordsMatch && (
                      <span className="text-xs text-[#ba1a1a] flex items-center gap-1 font-semibold mt-0.5" role="alert">
                        <span className="material-symbols-outlined text-[14px]">info</span> Passwords do not match.
                      </span>
                    )}
                  </div>

                  {/* Terms and Privacy Checkbox */}
                  <div className="flex flex-col gap-1 mt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={regTerms}
                        onChange={(e) => setRegTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded text-[#f48fb1] focus:ring-[#f48fb1]/30 border-[#d8c1c6] cursor-pointer"
                        required
                      />
                      <span className="text-xs sm:text-sm text-[#534247] leading-relaxed">
                        I agree to the{' '}
                        <span className="text-[#964261] underline font-bold hover:text-[#f48fb1]">
                          Academic Terms of Service
                        </span>{' '}
                        and acknowledge the{' '}
                        <span className="text-[#964261] underline font-bold hover:text-[#f48fb1]">
                          Student Privacy Policy
                        </span>.
                      </span>
                    </label>
                  </div>

                  {/* Primary Action CTA — Tactile Bubblegum Pink Button */}
                  <div className="mt-3">
                    <button
                      type="submit"
                      disabled={regState === 'submitting'}
                      className="w-full h-12 rounded-full bg-[#f48fb1] hover:bg-[#f07fa6] text-white font-['Quicksand'] font-bold text-sm sm:text-base shadow-[0_4px_0_#d87395] active:translate-y-[3px] active:shadow-[0_1px_0_#d87395] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span>
                        {regState === 'submitting'
                          ? 'Creating Account...'
                          : 'Create Student Account'}
                      </span>
                      {regState === 'submitting' ? (
                        <span className="animate-spin material-symbols-outlined text-[20px]">
                          progress_activity
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      )}
                    </button>
                  </div>
                </form>

                {/* Institutional Sign In Cross Link */}
                <div className="mt-6 pt-5 border-t border-[#f5e4e7] flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                  <span className="text-xs sm:text-sm text-[#534247]">
                    Already enrolled with an account?
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigateScreen('AUTH-01-LOGIN')}
                    className="font-['Quicksand'] font-bold text-sm text-[#964261] hover:text-[#f48fb1] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Sign In</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Security & Institutional Assurance Footnote */}
              <div className="mt-5 text-center">
                <p className="text-xs text-[#534247] flex items-center justify-center gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">lock</span>
                  256-bit SSL encrypted institutional student registry
                </p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =================================================================== */}
      {/* SCREEN 2: EMAIL VERIFICATION (AUTH-03-VERIFY-EMAIL)                 */}
      {/* =================================================================== */}
      {screenId === 'AUTH-03-VERIFY-EMAIL' && (
        <main className="w-full bg-[#fff8f8] flex-grow flex items-center justify-center py-10 sm:py-16">
          <div className="flex flex-col w-full items-center justify-center px-4 sm:px-6">
            <div className="w-full max-w-xl flex flex-col gap-6 relative">
              {/* State Simulation Control Bar */}
              <div className="w-full bg-white/90 backdrop-blur-sm rounded-3xl p-3.5 border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.08)] flex flex-col gap-2">
                <div className="flex items-center justify-between px-2">
                  <span className="font-['Quicksand'] font-bold text-xs text-[#534247] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#f48fb1]">tune</span>
                    Lifecycle State Simulator
                  </span>
                  <span className="font-['Quicksand'] font-bold text-xs text-[#964261] bg-[#fff0f2] px-2.5 py-0.5 rounded-full border border-[#f5e4e7]">
                    AUTH-02 Guard
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 font-['Quicksand']">
                  {(
                    [
                      { key: 'waiting', label: '1. Waiting' },
                      { key: 'resend', label: '2. Resend' },
                      { key: 'verified', label: '3. Verified' },
                      { key: 'expired', label: '4. Expired' },
                      { key: 'failed', label: '5. Invalid' },
                    ] as { key: VerifyQaState; label: string }[]
                  ).map((tab) => {
                    const isActive = verifyState === tab.key;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => switchVerifyState(tab.key)}
                        className={`py-1.5 px-2 rounded-full text-xs font-bold transition-all text-center truncate cursor-pointer ${
                          isActive
                            ? 'bg-[#f48fb1] text-white shadow-xs'
                            : 'text-[#534247] hover:bg-[#fff0f2] hover:text-[#22191b]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main Card Container */}
              <div className="w-full bg-white rounded-3xl border border-[#fbeaec] shadow-[0_8px_30px_rgba(244,143,177,0.12)] p-6 sm:p-10 flex flex-col relative overflow-hidden text-center">
                {/* Decorative Pastel Ambient */}
                <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#ffe082]/30 blur-2xl pointer-events-none" />

                {/* State 1: WAITING */}
                {verifyState === 'waiting' && (
                  <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-[#f48fb1]/20 blur-md" />
                      <div className="relative w-16 h-16 rounded-full bg-[#fff0f2] border-2 border-[#f48fb1] text-[#964261] flex items-center justify-center shadow-xs">
                        <span className="material-symbols-outlined text-[32px] text-[#f48fb1]">
                          mark_email_unread
                        </span>
                      </div>
                      <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#81d4fa] text-[#22191b] flex items-center justify-center text-[12px] shadow-2xs font-bold border-2 border-white">
                        <span className="material-symbols-outlined text-[13px]">lock</span>
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff0f2] text-[#964261] mb-3 text-xs font-['Quicksand'] font-bold border border-[#f5e4e7]">
                      <span>Student Route Guarded</span>
                      <span>•</span>
                      <span>Pending Verification</span>
                    </div>
                    <h1 className="font-['Quicksand'] font-bold text-2xl sm:text-3xl text-[#22191b] mb-2">
                      Verify your email address
                    </h1>
                    <p className="text-sm text-[#534247] max-w-md mx-auto mb-6">
                      We’ve sent a verification link to your registered email address{' '}
                      <span className="font-bold text-[#22191b] bg-[#fff0f2] px-2 py-0.5 rounded-full border border-[#f5e4e7]">
                        student@theintenglish.edu
                      </span>
                      . Please click the link to activate your student account.
                    </p>
                    <div className="w-full bg-[#fff8f8] rounded-2xl p-4 text-left mb-6 border border-[#f5e4e7] flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#ffe082] text-[22px] shrink-0 mt-0.5 bg-[#22191b] rounded-full p-0.5">
                        info
                      </span>
                      <div className="flex flex-col text-xs sm:text-sm">
                        <span className="font-['Quicksand'] font-bold text-[#22191b]">
                          Didn’t receive the email?
                        </span>
                        <span className="text-[#534247] mt-0.5">
                          Check your spam folder or request a fresh activation link below.
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={triggerResendAction}
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#f48fb1] hover:bg-[#f07fa6] text-white font-['Quicksand'] font-bold text-xs sm:text-sm shadow-[0_4px_0_#d87395] active:translate-y-[3px] active:shadow-[0_1px_0_#d87395] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
                        <span>Resend Verification Email</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigateScreen('AUTH-01-LOGIN')}
                        className="w-full sm:w-auto px-5 py-3 rounded-full font-['Quicksand'] font-bold text-xs sm:text-sm text-[#534247] hover:text-[#964261] bg-[#fff0f2] hover:bg-[#ffe4e9] border border-[#f5e4e7] transition-colors cursor-pointer"
                      >
                        Back to Login
                      </button>
                    </div>
                  </div>
                )}

                {/* State 2: RESEND */}
                {verifyState === 'resend' && (
                  <div className="flex flex-col items-center">
                    {resendSpinner ? (
                      <div className="flex flex-col items-center my-8">
                        <div className="w-14 h-14 rounded-full border-4 border-[#fff0f2] border-t-[#f48fb1] animate-spin mb-4" />
                        <p className="font-['Quicksand'] font-bold text-base text-[#22191b]">
                          Generating secure dispatch token...
                        </p>
                        <p className="text-xs text-[#534247] mt-1">
                          Communicating with institutional mail gateway
                        </p>
                      </div>
                    ) : (
                      <div className="flex-col items-center w-full flex">
                        <div className="w-16 h-16 rounded-full bg-[#e8f5e9] border-2 border-[#a5d6a7] flex items-center justify-center mb-4 shadow-2xs">
                          <span className="material-symbols-outlined text-[#1b5e20] text-[32px]">
                            send
                          </span>
                        </div>
                        <div className="w-full bg-[#e8f5e9]/70 border border-[#a5d6a7] rounded-2xl p-4 mb-4 text-left flex items-start gap-3 shadow-2xs">
                          <span className="material-symbols-outlined text-[#1b5e20] text-[20px] shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <div className="flex flex-col text-xs sm:text-sm">
                            <span className="font-['Quicksand'] font-bold text-[#1b5e20]">
                              Verification Link Dispatched
                            </span>
                            <p className="text-[#2e7d32] mt-0.5">
                              A new link has been sent to your inbox. Please wait{' '}
                              <span className="font-bold underline">{countdown}</span> seconds before requesting another.
                            </p>
                          </div>
                        </div>
                        <h2 className="font-['Quicksand'] font-bold text-2xl text-[#22191b] mb-2">
                          Check your inbox again
                        </h2>
                        <p className="text-xs sm:text-sm text-[#534247] max-w-md mx-auto mb-6">
                          We’ve superseded prior links with a fresh cryptographic code. Click the new link in your inbox.
                        </p>
                        <div className="w-full flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={triggerResendAction}
                            className="px-5 py-2.5 rounded-full bg-[#81d4fa] hover:bg-[#6ecefb] text-[#22191b] font-['Quicksand'] font-bold text-xs sm:text-sm shadow-[0_4px_0_#4ba3e3] active:translate-y-[3px] active:shadow-[0_1px_0_#4ba3e3] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
                            <span>Resend Again</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onNavigateScreen('AUTH-01-LOGIN')}
                            className="px-5 py-2.5 rounded-full font-['Quicksand'] font-bold text-xs sm:text-sm text-[#534247] hover:text-[#964261] bg-[#fff0f2] hover:bg-[#ffe4e9] border border-[#f5e4e7] transition-colors cursor-pointer"
                          >
                            Return to Login
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* State 3: VERIFIED */}
                {verifyState === 'verified' && (
                  <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-[#a5d6a7]/30 blur-md" />
                      <div className="relative w-16 h-16 rounded-full bg-[#e8f5e9] border-2 border-[#a5d6a7] text-[#1b5e20] flex items-center justify-center shadow-xs">
                        <span className="material-symbols-outlined text-[36px]">verified</span>
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1b5e20] text-white flex items-center justify-center text-[12px] shadow-2xs">
                        <span className="material-symbols-outlined text-[14px]">done_all</span>
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f5e9] text-[#1b5e20] mb-3 text-xs font-['Quicksand'] font-bold border border-[#a5d6a7]">
                      <span>Student Identity Activated</span>
                    </div>
                    <h2 className="font-['Quicksand'] font-bold text-2xl sm:text-3xl text-[#22191b] mb-2">
                      Email verified successfully!
                    </h2>
                    <p className="text-xs sm:text-sm text-[#534247] max-w-md mx-auto mb-6">
                      Your student account is now active and ready. Proceed to Student Home to begin discovering courses, placement reviews, and modules.
                    </p>
                    <div className="w-full bg-[#fff8f8] rounded-2xl p-4 mb-6 border border-[#f5e4e7] text-left flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-full bg-[#f48fb1] text-white flex items-center justify-center shadow-2xs">
                          <span className="material-symbols-outlined text-[20px]">school</span>
                        </span>
                        <div className="flex flex-col">
                          <span className="font-['Quicksand'] font-bold text-xs sm:text-sm text-[#22191b]">
                            Target Destination
                          </span>
                          <span className="text-xs text-[#534247]">
                            STU-HOME-01 • /student/home
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-['Quicksand'] font-bold bg-[#e8f5e9] text-[#1b5e20] px-3 py-1 rounded-full border border-[#a5d6a7]">
                        Authorized
                      </span>
                    </div>
                    <div className="w-full flex flex-col gap-2 items-center">
                      <button
                        type="button"
                        onClick={() => onNavigateScreen('STU-01-PORTAL')}
                        className="w-full py-3.5 rounded-full bg-[#f48fb1] hover:bg-[#f07fa6] text-white font-['Quicksand'] font-bold text-sm sm:text-base shadow-[0_4px_0_#d87395] active:translate-y-[3px] active:shadow-[0_1px_0_#d87395] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Go to Student Home (STU-HOME-01)</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* State 4: EXPIRED */}
                {verifyState === 'expired' && (
                  <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-[#ffe082]/30 blur-md" />
                      <div className="relative w-16 h-16 rounded-full bg-[#fffde7] border-2 border-[#ffe082] text-[#725c06] flex items-center justify-center shadow-xs">
                        <span className="material-symbols-outlined text-[34px]">schedule</span>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fffde7] text-[#725c06] mb-3 text-xs font-['Quicksand'] font-bold border border-[#ffe082]">
                      <span>Security Token Expired</span>
                    </div>
                    <h2 className="font-['Quicksand'] font-bold text-2xl text-[#22191b] mb-2">
                      Verification link expired
                    </h2>
                    <p className="text-xs sm:text-sm text-[#534247] max-w-md mx-auto mb-6">
                      This security link has expired for your protection. Please generate a fresh verification link.
                    </p>
                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => switchVerifyState('resend')}
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#f48fb1] hover:bg-[#f07fa6] text-white font-['Quicksand'] font-bold text-xs sm:text-sm shadow-[0_4px_0_#d87395] active:translate-y-[3px] active:shadow-[0_1px_0_#d87395] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">refresh</span>
                        <span>Send New Verification Link</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigateScreen('AUTH-01-LOGIN')}
                        className="w-full sm:w-auto px-5 py-3 rounded-full font-['Quicksand'] font-bold text-xs sm:text-sm text-[#534247] hover:text-[#964261] bg-[#fff0f2] hover:bg-[#ffe4e9] border border-[#f5e4e7] transition-colors cursor-pointer"
                      >
                        Return to Login
                      </button>
                    </div>
                  </div>
                )}

                {/* State 5: FAILED / INVALID */}
                {verifyState === 'failed' && (
                  <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-[#ffdad6]/40 blur-md" />
                      <div className="relative w-16 h-16 rounded-full bg-[#fff0f2] border-2 border-[#ba1a1a] text-[#ba1a1a] flex items-center justify-center shadow-xs">
                        <span className="material-symbols-outlined text-[34px]">error_outline</span>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#93000a] mb-3 text-xs font-['Quicksand'] font-bold border border-[#ba1a1a]/30">
                      <span>Access Denied • 403 Invariant</span>
                    </div>
                    <h2 className="font-['Quicksand'] font-bold text-2xl text-[#22191b] mb-2">
                      Invalid verification token
                    </h2>
                    <p className="text-xs sm:text-sm text-[#534247] max-w-md mx-auto mb-6">
                      This link is invalid or malformed. For security, raw token signatures cannot be reused across active sessions.
                    </p>
                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => switchVerifyState('resend')}
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#f48fb1] hover:bg-[#f07fa6] text-white font-['Quicksand'] font-bold text-xs sm:text-sm shadow-[0_4px_0_#d87395] active:translate-y-[3px] active:shadow-[0_1px_0_#d87395] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">outgoing_mail</span>
                        <span>Resend Email</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigateScreen('AUTH-01-LOGIN')}
                        className="w-full sm:w-auto px-5 py-3 rounded-full font-['Quicksand'] font-bold text-xs sm:text-sm text-[#534247] hover:text-[#964261] bg-[#fff0f2] hover:bg-[#ffe4e9] border border-[#f5e4e7] transition-colors cursor-pointer"
                      >
                        Return to Login
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =================================================================== */}
      {/* SCREEN 3: LOGIN (AUTH-01-LOGIN)                                     */}
      {/* =================================================================== */}
      {screenId === 'AUTH-01-LOGIN' && (
        <main className="w-full bg-[#fff8f8] flex-grow flex items-center justify-center py-10 sm:py-16">
          <div className="flex flex-col w-full">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col items-center">
              {/* State Inspector Controller / Interactive Showcase Dock */}
              <div className="w-full max-w-3xl mb-8 p-3.5 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.08)] flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[#534247]">
                  <span className="material-symbols-outlined text-[18px] text-[#f48fb1]">tune</span>
                  <span className="font-['Quicksand'] font-bold text-xs tracking-wider uppercase text-[#22191b]">
                    Screen State Inspector:
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5 font-['Quicksand']">
                  {(
                    [
                      { key: 'default', label: 'A: Default' },
                      { key: 'validation-error', label: 'B: Format Error' },
                      { key: 'invalid-creds', label: 'C: Invalid Auth' },
                      { key: 'unverified', label: 'D: Unverified' },
                      { key: 'submitting', label: 'E: Submitting' },
                      { key: 'dispatch', label: 'F: Role Dispatch' },
                    ] as { key: LoginQaState; label: string }[]
                  ).map((btn) => {
                    const isActive = loginState === btn.key;
                    return (
                      <button
                        key={btn.key}
                        type="button"
                        onClick={() => applyLoginQaState(btn.key)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#f48fb1] text-white shadow-xs'
                            : 'text-[#534247] bg-[#fff0f2] hover:bg-[#ffe4e9] hover:text-[#22191b]'
                        }`}
                      >
                        {btn.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="w-full flex flex-col lg:flex-row items-stretch justify-center gap-8 max-w-5xl">
                {/* Unified Login Form Card */}
                <section
                  aria-labelledby="login-header"
                  className="w-full max-w-lg bg-white rounded-3xl border border-[#fbeaec] shadow-[0_8px_30px_rgba(244,143,177,0.12)] p-6 sm:p-10 transition-all relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#f48fb1]/15 blur-2xl pointer-events-none" />
                  <div>
                    {/* Header with Brand Avatar */}
                    <div className="flex items-center gap-3.5 mb-6">
                      <img
                        src={TR_THEINT_LOGO_URL}
                        alt="Teacher Theint"
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#f48fb1] shadow-2xs"
                      />
                      <div>
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fff0f2] border border-[#f5e4e7] text-[11px] font-['Quicksand'] font-bold text-[#964261]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f48fb1]" />
                          <span>Teacher Theint English Gateway</span>
                        </div>
                        <h1
                          className="font-['Quicksand'] font-bold text-2xl text-[#22191b] tracking-tight mt-0.5"
                          id="login-header"
                        >
                          Welcome Back
                        </h1>
                      </div>
                    </div>

                    {/* State C: Invalid Credentials Alert */}
                    {loginState === 'invalid-creds' && (
                      <div className="mb-5 p-3.5 rounded-2xl bg-[#ffdad6]/70 border border-[#ba1a1a]/30 text-[#93000a] text-xs sm:text-sm shadow-2xs">
                        <div className="flex items-start gap-2.5">
                          <span className="material-symbols-outlined text-[#ba1a1a] text-[20px] shrink-0 mt-0.5">
                            error
                          </span>
                          <div>
                            <p className="font-['Quicksand'] font-bold text-[#ba1a1a]">
                              Authentication Failed
                            </p>
                            <p className="text-[#93000a] mt-0.5">
                              Incorrect email or password. Please check your credentials and try again.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* State D: Unverified Student Notice */}
                    {loginState === 'unverified' && (
                      <div className="mb-5 p-3.5 rounded-2xl bg-[#fff0f2] border border-[#f5e4e7] text-[#22191b] shadow-2xs">
                        <div className="flex items-start gap-2.5">
                          <span className="material-symbols-outlined text-[#f48fb1] text-[20px] shrink-0 mt-0.5">
                            mark_email_unread
                          </span>
                          <div className="text-xs sm:text-sm">
                            <p className="font-['Quicksand'] font-bold text-[#964261]">
                              Account Verification Required
                            </p>
                            <p className="text-[#534247] mt-0.5">
                              Your email address has not been verified yet. Course materials remain locked until validated.
                            </p>
                            <button
                              type="button"
                              onClick={() => onNavigateScreen('AUTH-03-VERIFY-EMAIL')}
                              className="inline-flex items-center gap-1 font-['Quicksand'] font-bold text-[#964261] hover:text-[#f48fb1] hover:underline mt-1.5 cursor-pointer text-xs"
                            >
                              <span>Verify Email Now</span>
                              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Form Element */}
                    <form className="space-y-4 font-['Nunito_Sans']" noValidate onSubmit={handleLoginSubmit}>
                      {/* Field 1: Email Address */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          className="font-['Quicksand'] font-bold text-xs sm:text-sm text-[#22191b] flex justify-between items-center"
                          htmlFor="email-input"
                        >
                          <span>Institutional Email</span>
                          {loginState === 'validation-error' && (
                            <span className="text-xs text-[#ba1a1a] font-bold">Invalid format</span>
                          )}
                        </label>
                        <div className="relative">
                          <input
                            id="email-input"
                            type="email"
                            value={loginEmail}
                            disabled={loginState === 'submitting'}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            placeholder="name@example.com"
                            className={`w-full h-11 px-4 pr-10 rounded-2xl bg-[#fff8f8] text-[#22191b] placeholder:text-[#867277] text-sm border transition-all focus:bg-white focus:outline-none focus:border-[#f48fb1] focus:ring-2 focus:ring-[#f48fb1]/20 ${
                              loginState === 'validation-error' ? 'border-[#ba1a1a] ring-1 ring-[#ba1a1a]' : 'border-[#f5e4e7]'
                            }`}
                            required
                          />
                          <span className="material-symbols-outlined absolute right-3.5 top-3 text-[18px] text-[#867277] pointer-events-none">
                            mail
                          </span>
                        </div>
                        {loginState === 'validation-error' && (
                          <p className="text-xs text-[#ba1a1a] font-semibold mt-0.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">warning</span>
                            Please enter a valid academic or personal email.
                          </p>
                        )}
                      </div>

                      {/* Field 2: Password */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                          <label
                            className="font-['Quicksand'] font-bold text-xs sm:text-sm text-[#22191b]"
                            htmlFor="password-input"
                          >
                            Password
                          </label>
                          <button
                            type="button"
                            onClick={() => onNavigateScreen('AUTH-03-VERIFY-EMAIL')}
                            className="text-xs font-['Quicksand'] font-bold text-[#006685] hover:text-[#964261] transition-colors cursor-pointer"
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <div className="relative">
                          <input
                            id="password-input"
                            type={showLoginPwd ? 'text' : 'password'}
                            value={loginPassword}
                            disabled={loginState === 'submitting'}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder="••••••••••••"
                            className={`w-full h-11 px-4 pr-11 rounded-2xl bg-[#fff8f8] text-[#22191b] placeholder:text-[#867277] text-sm border transition-all focus:bg-white focus:outline-none focus:border-[#f48fb1] focus:ring-2 focus:ring-[#f48fb1]/20 ${
                              loginState === 'validation-error' ? 'border-[#ba1a1a] ring-1 ring-[#ba1a1a]' : 'border-[#f5e4e7]'
                            }`}
                            required
                          />
                          <button
                            aria-label="Toggle password visibility"
                            type="button"
                            onClick={() => setShowLoginPwd((prev) => !prev)}
                            className="absolute right-3 top-2.5 w-7 h-7 rounded flex items-center justify-center text-[#534247] hover:text-[#22191b] transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {showLoginPwd ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                        </div>
                        {loginState === 'validation-error' && (
                          <p className="text-xs text-[#ba1a1a] font-semibold mt-0.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">warning</span>
                            Password must be at least 8 characters.
                          </p>
                        )}
                      </div>

                      {/* Tactile Bubblegum Primary Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={loginState === 'submitting'}
                          className="w-full h-12 rounded-full bg-[#f48fb1] hover:bg-[#f07fa6] text-white font-['Quicksand'] font-bold text-sm sm:text-base shadow-[0_4px_0_#d87395] active:translate-y-[3px] active:shadow-[0_1px_0_#d87395] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {loginState !== 'submitting' ? (
                            <>
                              <span>Log In</span>
                              <span className="material-symbols-outlined text-[18px]">login</span>
                            </>
                          ) : (
                            <>
                              <span className="animate-spin material-symbols-outlined text-[20px]">
                                progress_activity
                              </span>
                              <span>Authenticating Identity...</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Secondary Institutional Path */}
                  <div className="mt-6 pt-5 border-t border-[#f5e4e7] bg-[#fff8f8] rounded-2xl p-3 text-center">
                    <p className="text-xs sm:text-sm text-[#534247]">
                      Don’t have an enrolled account?{' '}
                      <button
                        type="button"
                        onClick={() => onNavigateScreen('AUTH-02-REGISTER')}
                        className="font-['Quicksand'] font-bold text-[#964261] hover:text-[#f48fb1] underline transition-colors cursor-pointer"
                      >
                        Register as Student
                      </button>
                    </p>
                  </div>
                </section>

                {/* Architecture Explainer & Dispatch Resolution Card */}
                <aside
                  aria-label="Dispatch Architecture Matrix"
                  className="w-full max-w-md flex flex-col gap-4"
                >
                  <div className="bg-white rounded-3xl border border-[#fbeaec] shadow-[0_8px_30px_rgba(244,143,177,0.12)] p-6 transition-all flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f5e4e7]">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#81d4fa] animate-pulse" />
                          <span className="font-['Quicksand'] font-bold text-xs uppercase tracking-widest text-[#006685]">
                            Inviolable Role Architecture
                          </span>
                        </div>
                        <span className="text-[11px] font-['Quicksand'] font-bold bg-[#fff0f2] text-[#964261] px-2.5 py-0.5 rounded-full border border-[#f5e4e7]">
                          RBAC Deterministic
                        </span>
                      </div>
                      <h2 className="font-['Quicksand'] font-bold text-lg text-[#22191b] mb-1">
                        Single Entry, Strict Role Dispatch
                      </h2>
                      <p className="text-xs text-[#534247] mb-4">
                        The platform enforces role fidelity. Identity cryptographically decrees the operational environment.
                      </p>

                      {/* Mapping Matrix Items */}
                      <div className="space-y-2.5 font-['Quicksand']">
                        {/* Student Route Target */}
                        <div
                          onClick={() => onNavigateScreen('STU-01-PORTAL')}
                          className="p-3 rounded-2xl bg-[#fff8f8] hover:bg-[#fff0f2] border border-[#f5e4e7] transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#f48fb1] text-white flex items-center justify-center shadow-xs shrink-0">
                              <span className="material-symbols-outlined text-[18px]">school</span>
                            </div>
                            <div>
                              <div className="font-bold text-xs sm:text-sm text-[#22191b] group-hover:text-[#f48fb1] transition-colors">
                                Student Learning Portal
                              </div>
                              <div className="text-[11px] text-[#534247] font-medium font-['Nunito_Sans']">
                                Curriculum, exercises &amp; 1-on-1 requests
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white font-mono text-[#964261] font-bold border border-[#f5e4e7]">
                              STU-HOME-01
                            </span>
                            <div className="text-[10px] text-[#867277] mt-0.5 font-sans">/student/home</div>
                          </div>
                        </div>

                        {/* Teacher Route Target */}
                        <div
                          onClick={() => onNavigateScreen('TEA-01-PORTAL')}
                          className="p-3 rounded-2xl bg-[#fff8f8] hover:bg-[#fff0f2] border border-[#f5e4e7] transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#81d4fa] text-[#22191b] flex items-center justify-center shadow-xs shrink-0 font-bold">
                              <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                            </div>
                            <div>
                              <div className="font-bold text-xs sm:text-sm text-[#22191b] group-hover:text-[#006685] transition-colors">
                                Teacher Academic Console
                              </div>
                              <div className="text-[11px] text-[#534247] font-medium font-['Nunito_Sans']">
                                Cohorts, rubrics &amp; assigned 1-on-1 clinics
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white font-mono text-[#006685] font-bold border border-[#f5e4e7]">
                              TCH-DASH-01
                            </span>
                            <div className="text-[10px] text-[#867277] mt-0.5 font-sans">/teacher/console</div>
                          </div>
                        </div>

                        {/* Admin Route Target */}
                        <div
                          onClick={() => onNavigateScreen('ADM-01-PORTAL')}
                          className={`p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer group shadow-2xs ${
                            loginState === 'dispatch'
                              ? 'ring-2 ring-[#f48fb1] bg-[#fff0f2] border-[#f48fb1]'
                              : 'bg-[#fff8f8] hover:bg-[#fff0f2] border-[#f5e4e7]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#ffe082] text-[#22191b] flex items-center justify-center shadow-xs shrink-0 font-bold">
                              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                            </div>
                            <div>
                              <div className="font-bold text-xs sm:text-sm text-[#22191b] group-hover:text-[#964261] transition-colors">
                                Admin Operation Control
                              </div>
                              <div className="text-[11px] text-[#534247] font-medium font-['Nunito_Sans']">
                                Enrollment release, faculty match &amp; decrees
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white font-mono text-[#22191b] font-bold border border-[#f5e4e7]">
                              ADM-DASH-01
                            </span>
                            <div className="text-[10px] text-[#867277] mt-0.5 font-sans">/admin/ops</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live Resolution Simulator Box */}
                    {loginState === 'dispatch' && (
                      <div className="mt-4 p-3.5 rounded-2xl bg-[#fff0f2] border border-[#f5e4e7] transition-all">
                        <div className="flex items-center justify-between text-xs mb-1 font-['Quicksand'] font-bold text-[#964261]">
                          <span className="uppercase tracking-wider">
                            Dispatch Resolution Active
                          </span>
                          <span className="text-[#1b5e20] bg-[#e8f5e9] px-2 py-0.5 rounded-full border border-[#a5d6a7]">
                            200 OK
                          </span>
                        </div>
                        <div className="text-xs text-[#22191b] mb-2 font-['Nunito_Sans']">
                          Identity verified: <strong>admin.theint@theint-academy.edu</strong>. Inviolable Role: <span className="text-[#964261] font-bold">Admin Master</span>.
                        </div>
                        <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-[#f5e4e7]">
                          <div className="bg-[#f48fb1] h-full w-full transition-all duration-700" />
                        </div>
                        <div className="mt-2 text-right">
                          <button
                            type="button"
                            onClick={() => onNavigateScreen('ADM-01-PORTAL')}
                            className="text-xs font-['Quicksand'] font-bold text-[#964261] hover:text-[#f48fb1] underline cursor-pointer"
                          >
                            Proceeding to ADM-DASH-01 →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Academic Integrity Note Card */}
                  <div className="bg-white rounded-3xl border border-[#fbeaec] shadow-[0_4px_16px_rgba(244,143,177,0.08)] p-4">
                    <div className="flex gap-3 items-start">
                      <span className="material-symbols-outlined text-[#81d4fa] text-[22px] shrink-0 bg-[#22191b] text-white rounded-full p-0.5">
                        policy
                      </span>
                      <div className="text-xs">
                        <h3 className="font-['Quicksand'] font-bold text-[#22191b]">
                          Strict Role Isolation Guarantee
                        </h3>
                        <p className="text-[#534247] mt-0.5 font-['Nunito_Sans']">
                          Zero multi-tenancy leakage. Protected student &amp; admin routes require cryptographic token validation.
                        </p>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Institutional Auth Footer */}
      <footer className="w-full bg-white border-t border-[#fbeaec] py-6 pb-24 shadow-[0_-2px_10px_rgba(244,143,177,0.04)] font-['Quicksand']">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#534247]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© 2024 Teacher Theint English Academy. All rights reserved.</span>
            <span className="hidden sm:inline text-[#d8c1c6]">•</span>
            <span className="text-[#964261] font-bold">Pastel Rainbow Academy</span>
          </div>
          <div className="flex items-center gap-4 font-semibold">
            <span className="hover:text-[#f48fb1] transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-[#f48fb1] transition-colors cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-[#f48fb1] transition-colors cursor-pointer">
              Help Center
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
