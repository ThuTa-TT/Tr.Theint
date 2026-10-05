import React, { useEffect, useState } from 'react';
import { LanguageCode, ScreenId } from '../../../types/navigation';
import { PublicNavbar } from '../../navigation/PublicNavbar';

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
        label: 'Security level',
        labelClass: 'font-body-sm text-body-sm text-tertiary ml-2 text-right',
        bar1: 'bg-surface-container-high',
        bar2: 'bg-surface-container-high',
        bar3: 'bg-surface-container-high',
      };
    }
    if (val.length < 6) {
      return {
        level: 1,
        label: 'Weak',
        labelClass: 'font-body-sm text-body-sm text-error ml-2 text-right',
        bar1: 'bg-error',
        bar2: 'bg-surface-container-high',
        bar3: 'bg-surface-container-high',
      };
    }
    if (val.length < 9 || !/\d/.test(val)) {
      return {
        level: 2,
        label: 'Good',
        labelClass: 'font-body-sm text-body-sm text-secondary ml-2 text-right',
        bar1: 'bg-secondary-container',
        bar2: 'bg-secondary-container',
        bar3: 'bg-surface-container-high',
      };
    }
    return {
      level: 3,
      label: 'Institutional Grade',
      labelClass: 'font-body-sm text-body-sm text-primary font-semibold ml-2 text-right',
      bar1: 'bg-primary',
      bar2: 'bg-primary',
      bar3: 'bg-primary',
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
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between selection:bg-secondary-container selection:text-on-secondary-container">
      <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 pt-8">
        {/* Canonical Main Public Navbar */}
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
        <main className="w-full bg-background flex-grow flex items-center justify-center py-space-xl">
          <div className="flex flex-col w-full items-center justify-center py-space-md px-margin-mobile sm:px-margin">
            <div className="w-full max-w-xl mx-auto flex flex-col items-center">
              {/* State Simulation Toolbar for Canonical QA */}
              <div className="w-full mb-space-md bg-surface-container p-space-xs rounded-xl shadow-sm">
                <div className="flex items-center justify-between px-space-xs mb-space-2xs">
                  <div className="flex items-center gap-space-2xs">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      science
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Screen States QA Bar
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-tertiary">
                    AUTH-01 Canonical
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-space-2xs">
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
                        className={`py-1 px-2 rounded-lg font-label-sm text-label-sm text-center transition-all cursor-pointer ${
                          isActive
                            ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                            : 'text-on-surface-variant hover:bg-surface-container-lowest hover:text-on-surface'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Registration Card */}
              <div className="w-full bg-surface-container-lowest rounded-xl shadow-md p-space-md sm:p-space-xl relative overflow-hidden transition-all duration-300">
                {/* Institutional Academic Header Badge */}
                <div className="flex items-center justify-between mb-space-sm pb-space-xs border-b border-surface-container-high">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                      Student Portal Enrollment
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-surface-container-low px-2 py-0.5 rounded text-on-surface-variant font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px]">school</span>
                    <span>Cohort 2024-25</span>
                  </div>
                </div>

                {/* Main Card Title */}
                <div className="text-left mb-space-lg">
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                    Create your Student Account
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Join Teacher Theint English to begin your personalized academic language
                    journey.
                  </p>
                </div>

                {/* State D: Duplicate Email Conflict Error */}
                {regState === 'conflict_email' && (
                  <div
                    aria-live="assertive"
                    className="mb-space-md p-space-sm rounded-lg bg-error-container text-on-error-container flex items-start gap-space-xs shadow-sm transition-all duration-300"
                    role="alert"
                  >
                    <span className="material-symbols-outlined text-[20px] text-error flex-shrink-0 mt-0.5">
                      error
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg font-bold">
                        Email Already Registered
                      </span>
                      <p className="font-body-md text-body-md text-on-error-container mt-0.5">
                        An account with this email address already exists in the student registry.
                        Please{' '}
                        <button
                          type="button"
                          onClick={() => onNavigateScreen('AUTH-01-LOGIN')}
                          className="underline font-semibold hover:text-error transition-colors cursor-pointer"
                        >
                          log in instead
                        </button>{' '}
                        or reset your forgotten password.
                      </p>
                    </div>
                  </div>
                )}

                {/* State F: Success Transition Banner */}
                {regState === 'success' && (
                  <div
                    aria-live="polite"
                    className="mb-space-md p-space-sm rounded-lg bg-surface-container-low text-on-surface shadow-sm transition-all duration-300"
                    role="status"
                  >
                    <div className="flex items-start gap-space-xs">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[16px] text-on-primary">
                          check
                        </span>
                      </div>
                      <div className="flex flex-col w-full">
                        <span className="font-label-lg text-label-lg font-bold text-primary">
                          Account Created Successfully
                        </span>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                          Welcome to the Academy! Redirecting to email verification portal
                          (student@theintenglish.edu)...
                        </p>
                        <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-3 overflow-hidden">
                          <div className="bg-primary h-full w-2/3 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Registration Form */}
                <form
                  className="flex flex-col gap-space-md"
                  noValidate
                  onSubmit={handleRegisterSubmit}
                >
                  {/* Field 1: Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-lg text-label-lg text-on-surface flex items-center justify-between"
                      htmlFor="reg-fullname"
                    >
                      <span>
                        Full Name <span className="text-error">*</span>
                      </span>
                      <span className="font-body-sm text-body-sm text-tertiary">
                        Official or Legal Name
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="reg-fullname"
                        type="text"
                        value={regFullname}
                        onChange={(e) => setRegFullname(e.target.value)}
                        placeholder="e.g., Maung Thein Htike"
                        className={`w-full h-10 px-3.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder-outline border transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          regState === 'validation_errors'
                            ? 'border-error ring-1 ring-error'
                            : 'border-outline-variant'
                        }`}
                        required
                      />
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      As it should appear on your institutional certificates.
                    </span>
                    {regState === 'validation_errors' && (
                      <span
                        className="font-body-sm text-body-sm text-error flex items-center gap-1 mt-0.5"
                        role="alert"
                      >
                        <span className="material-symbols-outlined text-[14px]">info</span> Please
                        enter your legal full name.
                      </span>
                    )}
                  </div>

                  {/* Field 2: Email Address */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-lg text-label-lg text-on-surface flex items-center justify-between"
                      htmlFor="reg-email"
                    >
                      <span>
                        Email Address <span className="text-error">*</span>
                      </span>
                      <span className="font-body-sm text-body-sm text-tertiary">
                        Student ID login
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="reg-email"
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="student@example.com"
                        className={`w-full h-10 px-3.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder-outline border transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          regState === 'validation_errors' || regState === 'conflict_email'
                            ? 'border-error ring-1 ring-error'
                            : 'border-outline-variant'
                        }`}
                        required
                      />
                      <span className="absolute right-3 top-2.5 material-symbols-outlined text-[18px] text-outline pointer-events-none">
                        mail
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      We will send your verification token and syllabus to this address.
                    </span>
                    {regState === 'validation_errors' && (
                      <span
                        className="font-body-sm text-body-sm text-error flex items-center gap-1 mt-0.5"
                        role="alert"
                      >
                        <span className="material-symbols-outlined text-[14px]">info</span> Please
                        provide a valid institutional or personal email.
                      </span>
                    )}
                  </div>

                  {/* Field 3: Phone Number */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-lg text-label-lg text-on-surface flex items-center justify-between"
                      htmlFor="reg-phone"
                    >
                      <span>
                        Phone Number <span className="text-error">*</span>
                      </span>
                      <span className="font-body-sm text-body-sm text-tertiary">SMS alerts</span>
                    </label>
                    <div className="relative">
                      <input
                        id="reg-phone"
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="09xxxxxxxxx or international (+95)"
                        className={`w-full h-10 px-3.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder-outline border transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          regState === 'validation_errors'
                            ? 'border-error ring-1 ring-error'
                            : 'border-outline-variant'
                        }`}
                        required
                      />
                      <span className="absolute right-3 top-2.5 material-symbols-outlined text-[18px] text-outline pointer-events-none">
                        phone
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Used for direct student notifications and security.
                    </span>
                    {regState === 'validation_errors' && (
                      <span
                        className="font-body-sm text-body-sm text-error flex items-center gap-1 mt-0.5"
                        role="alert"
                      >
                        <span className="material-symbols-outlined text-[14px]">info</span> A
                        contact phone number is required for cohort enrollment.
                      </span>
                    )}
                  </div>

                  {/* Field 4: Password with Eye Toggle */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-lg text-label-lg text-on-surface flex items-center justify-between"
                      htmlFor="reg-password"
                    >
                      <span>
                        Create Password <span className="text-error">*</span>
                      </span>
                      <span className="font-body-sm text-body-sm text-tertiary">
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
                        className={`w-full h-10 pl-3.5 pr-10 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder-outline border transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          regState === 'validation_errors'
                            ? 'border-error ring-1 ring-error'
                            : 'border-outline-variant'
                        }`}
                        required
                      />
                      <button
                        aria-label="Toggle password visibility"
                        type="button"
                        onClick={() => setShowRegPwd((prev) => !prev)}
                        className="absolute right-2.5 top-2 text-on-surface-variant hover:text-primary p-1 focus:outline-none cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showRegPwd ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    {/* Password Strength Indicator */}
                    <div className="flex items-center gap-1.5 mt-1">
                      <div
                        className={`h-1 flex-1 rounded-full transition-colors ${pwdStrength.bar1}`}
                      ></div>
                      <div
                        className={`h-1 flex-1 rounded-full transition-colors ${pwdStrength.bar2}`}
                      ></div>
                      <div
                        className={`h-1 flex-1 rounded-full transition-colors ${pwdStrength.bar3}`}
                      ></div>
                      <span className={pwdStrength.labelClass}>{pwdStrength.label}</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Must contain at least 8 characters.
                    </span>
                    {regState === 'validation_errors' && (
                      <span
                        className="font-body-sm text-body-sm text-error flex items-center gap-1 mt-0.5"
                        role="alert"
                      >
                        <span className="material-symbols-outlined text-[14px]">info</span>{' '}
                        Password must satisfy length and character complexity rules.
                      </span>
                    )}
                  </div>

                  {/* Field 5: Password Confirmation */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-lg text-label-lg text-on-surface flex items-center justify-between"
                      htmlFor="reg-confirm-password"
                    >
                      <span>
                        Confirm Password <span className="text-error">*</span>
                      </span>
                      {passwordsMatch && (
                        <span className="font-body-sm text-body-sm text-primary flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">
                            check_circle
                          </span>{' '}
                          Passwords match
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
                        className={`w-full h-10 pl-3.5 pr-10 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder-outline border transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          regState === 'validation_errors'
                            ? 'border-error ring-1 ring-error'
                            : 'border-outline-variant'
                        }`}
                        required
                      />
                      <button
                        aria-label="Toggle confirm password visibility"
                        type="button"
                        onClick={() => setShowRegConfirmPwd((prev) => !prev)}
                        className="absolute right-2.5 top-2 text-on-surface-variant hover:text-primary p-1 focus:outline-none cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showRegConfirmPwd ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    {regState === 'validation_errors' && (
                      <span
                        className="font-body-sm text-body-sm text-error flex items-center gap-1 mt-0.5"
                        role="alert"
                      >
                        <span className="material-symbols-outlined text-[14px]">info</span>{' '}
                        Passwords do not match.
                      </span>
                    )}
                  </div>

                  {/* Role Lock System Banner */}
                  <div className="p-space-xs rounded-lg bg-surface-container-low flex items-center gap-space-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px] text-secondary flex-shrink-0">
                      verified_user
                    </span>
                    <p className="font-body-sm text-body-sm">
                      Public registration creates an unverified{' '}
                      <strong className="text-on-surface font-semibold">Student Account</strong>.
                      Instructor and Administrator roles are assigned strictly through invitation
                      credentials.
                    </p>
                  </div>

                  {/* Terms and Privacy Checkbox */}
                  <div className="flex flex-col gap-1 mt-space-2xs">
                    <label className="flex items-start gap-space-xs cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={regTerms}
                        onChange={(e) => setRegTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary/30 border-outline-variant focus:ring-offset-0 cursor-pointer"
                        required
                      />
                      <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        I agree to the{' '}
                        <span className="text-primary underline hover:text-secondary font-medium">
                          Academic Terms of Service
                        </span>{' '}
                        and acknowledge the{' '}
                        <span className="text-primary underline hover:text-secondary font-medium">
                          Institutional Student Privacy Policy
                        </span>
                        .
                      </span>
                    </label>
                    {regState === 'validation_errors' && (
                      <span
                        className="font-body-sm text-body-sm text-error flex items-center gap-1 mt-0.5"
                        role="alert"
                      >
                        <span className="material-symbols-outlined text-[14px]">info</span> You must
                        accept the academic guidelines to proceed.
                      </span>
                    )}
                  </div>

                  {/* Primary Action CTA */}
                  <div className="mt-space-xs flex flex-col gap-space-sm">
                    <button
                      type="submit"
                      disabled={regState === 'submitting'}
                      className="w-full h-11 rounded-lg bg-primary hover:bg-on-primary-fixed-variant active:bg-on-primary-fixed text-on-primary font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <span>
                        {regState === 'submitting'
                          ? 'Verifying Credentials...'
                          : 'Create Student Account'}
                      </span>
                      {regState === 'submitting' && (
                        <span className="animate-spin material-symbols-outlined text-[20px]">
                          progress_activity
                        </span>
                      )}
                    </button>
                  </div>
                </form>

                {/* Institutional Sign In Cross Link */}
                <div className="mt-space-lg pt-space-md border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-space-xs text-center sm:text-left">
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    Already enrolled with an account?
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigateScreen('AUTH-01-LOGIN')}
                    className="font-label-lg text-label-lg text-primary hover:text-secondary font-semibold transition-colors flex items-center gap-1 focus:outline-none cursor-pointer"
                  >
                    <span>Sign In</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Security & Institutional Assurance Footnote */}
              <div className="mt-space-md text-center max-w-sm">
                <p className="font-body-sm text-body-sm text-tertiary flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  256-bit SSL encrypted institutional registry
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
        <main className="w-full bg-background flex-grow flex items-center justify-center py-space-xl">
          <div className="flex flex-col w-full items-center justify-center py-space-md px-margin-mobile sm:px-margin">
            <div className="w-full max-w-xl flex flex-col gap-space-lg relative">
              {/* State Simulation Control Bar */}
              <div className="w-full bg-surface-container-low rounded-xl p-space-xs shadow-sm flex flex-col gap-space-2xs">
                <div className="flex items-center justify-between px-space-xs pt-1">
                  <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">tune</span> Lifecycle
                    State Simulator
                  </span>
                  <span className="font-label-sm text-label-sm text-primary bg-primary-fixed px-2 py-0.5 rounded-full font-bold">
                    AUTH-02 Guard
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1 bg-surface-container-lowest p-1 rounded-lg">
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
                        className={`py-1.5 px-1 rounded font-label-md text-label-md transition-all text-center truncate cursor-pointer ${
                          isActive
                            ? 'bg-primary text-on-primary shadow-sm'
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main Card Container */}
              <div className="w-full bg-surface-container-lowest rounded-xl shadow-md p-space-lg sm:p-space-xl flex flex-col relative overflow-hidden">
                {/* Institutional Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-primary-container to-secondary"></div>

                {/* State 1: WAITING */}
                {verifyState === 'waiting' && (
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-20 h-20 mb-space-md flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-primary-fixed opacity-70 blur-md"></div>
                      <div className="relative w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-primary text-[36px]">
                          mark_email_unread
                        </span>
                      </div>
                      <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-[12px] shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">lock</span>
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-space-xs py-0.5 rounded-full bg-surface-container text-secondary mb-space-xs font-label-sm text-label-sm font-semibold">
                      <span>Student Route Guarded</span>
                      <span>•</span>
                      <span>Unverified</span>
                    </div>
                    <h1 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs">
                      Verify your email address
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-space-md">
                      We’ve sent a verification link to your registered email address{' '}
                      <span className="font-semibold text-on-surface bg-surface-container-low px-1.5 py-0.5 rounded">
                        j***@example.com
                      </span>
                      . Please check your inbox and click the link to activate your Student
                      account.
                    </p>
                    <div className="w-full bg-surface-container-low rounded-lg p-space-sm text-left mb-space-lg flex items-start gap-space-xs">
                      <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">
                        info
                      </span>
                      <div className="flex flex-col gap-0.5 text-left">
                        <span className="font-label-md text-label-md text-on-surface">
                          Didn&apos;t receive the email?
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Check your spam folder or request a new activation link below.
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-space-sm">
                      <button
                        type="button"
                        onClick={triggerResendAction}
                        className="w-full sm:w-auto px-space-md py-2.5 rounded-lg bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-variant transition-colors flex items-center justify-center gap-space-2xs shadow-sm cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          forward_to_inbox
                        </span>
                        <span>Resend Verification Email</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigateScreen('AUTH-01-LOGIN')}
                        className="w-full sm:w-auto px-space-md py-2.5 rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors text-center cursor-pointer"
                      >
                        Back to Login
                      </button>
                    </div>
                  </div>
                )}

                {/* State 2: RESEND */}
                {verifyState === 'resend' && (
                  <div className="flex flex-col items-center text-center">
                    {resendSpinner ? (
                      <div className="flex flex-col items-center my-space-md">
                        <div className="w-14 h-14 rounded-full border-4 border-surface-variant border-t-primary animate-spin mb-space-sm"></div>
                        <p className="font-label-lg text-label-lg text-on-surface">
                          Generating secure dispatch token...
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Communicating with institutional mail gateway
                        </p>
                      </div>
                    ) : (
                      <div className="flex-col items-center w-full flex">
                        <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-space-md shadow-sm">
                          <span className="material-symbols-outlined text-primary text-[32px]">
                            send
                          </span>
                        </div>
                        <div className="w-full bg-[#EFF7F2] rounded-lg p-space-sm mb-space-md text-left flex items-start gap-space-xs shadow-sm">
                          <span className="material-symbols-outlined text-[#3D6850] text-[20px] shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-[#3D6850]">
                              Verification Link Dispatched
                            </span>
                            <p className="font-body-sm text-body-sm text-[#3D6850]/90 mt-0.5">
                              A new verification link has been sent to your email. Please wait{' '}
                              <span className="font-bold underline">{countdown}</span> seconds
                              before requesting another.
                            </p>
                          </div>
                        </div>
                        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs">
                          Check your inbox again
                        </h2>
                        <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-space-lg">
                          We’ve superseded prior links with a new cryptographic verification code.
                          Click the new link in{' '}
                          <span className="font-semibold text-on-surface">j***@example.com</span>.
                        </p>
                        <div className="w-full flex items-center justify-center gap-space-sm">
                          <button
                            type="button"
                            onClick={triggerResendAction}
                            className="w-full sm:w-auto px-space-md py-2.5 rounded-lg bg-surface-container font-label-lg text-label-lg flex items-center justify-center gap-space-2xs text-on-surface hover:bg-surface-variant cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              forward_to_inbox
                            </span>
                            <span>Resend Again</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onNavigateScreen('AUTH-01-LOGIN')}
                            className="px-space-md py-2.5 font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
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
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-20 h-20 mb-space-md flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-[#EFF7F2] opacity-80 blur-md"></div>
                      <div className="relative w-16 h-16 rounded-full bg-[#EFF7F2] text-[#3D6850] flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[36px]">verified</span>
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#3D6850] text-surface-container-lowest flex items-center justify-center text-[12px] shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">done_all</span>
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-space-xs py-0.5 rounded-full bg-[#EFF7F2] text-[#3D6850] mb-space-xs font-label-sm text-label-sm font-semibold">
                      <span>Student Identity Activated</span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs">
                      Email verified successfully!
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-space-lg">
                      Your student account is now active and ready. Proceed to Student Home to
                      start discovering courses, scheduling placement reviews, and beginning your
                      modules.
                    </p>
                    <div className="w-full bg-surface-container-low rounded-lg p-space-sm mb-space-lg text-left flex items-center justify-between">
                      <div className="flex items-center gap-space-xs">
                        <span className="w-8 h-8 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center shadow-sm">
                          <span className="material-symbols-outlined text-[18px]">school</span>
                        </span>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface">
                            Target Destination
                          </span>
                          <span className="font-body-sm text-body-sm text-tertiary">
                            STU-HOME-01 • /student/home
                          </span>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm bg-[#EFF7F2] text-[#3D6850] px-2 py-1 rounded font-bold">
                        Authorized
                      </span>
                    </div>
                    <div className="w-full flex flex-col gap-space-xs items-center">
                      <button
                        type="button"
                        onClick={() => onNavigateScreen('STU-01-PORTAL')}
                        className="w-full py-3 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-space-xs shadow-sm cursor-pointer"
                      >
                        <span>Go to Student Home (STU-HOME-01)</span>
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_forward
                        </span>
                      </button>
                      <span className="font-body-sm text-body-sm text-tertiary mt-1">
                        Automatic redirect in 10 seconds...
                      </span>
                    </div>
                  </div>
                )}

                {/* State 4: EXPIRED */}
                {verifyState === 'expired' && (
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-20 h-20 mb-space-md flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-[#FCF6EC] opacity-80 blur-md"></div>
                      <div className="relative w-16 h-16 rounded-full bg-[#FCF6EC] text-[#8C6328] flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[36px]">schedule</span>
                      </div>
                      <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#8C6328] text-surface-container-lowest flex items-center justify-center text-[12px] shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">
                          priority_high
                        </span>
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-space-xs py-0.5 rounded-full bg-[#FCF6EC] text-[#8C6328] mb-space-xs font-label-sm text-label-sm font-semibold">
                      <span>Security Token Expired</span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs">
                      Verification link expired
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-space-lg">
                      This security link has expired for your protection. Please generate a fresh
                      verification link.
                    </p>
                    <div className="w-full bg-[#FCF6EC] rounded-lg p-space-sm mb-space-lg text-left flex items-start gap-space-xs">
                      <span className="material-symbols-outlined text-[#8C6328] text-[20px] shrink-0 mt-0.5">
                        lock_clock
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-[#8C6328]">
                          Token Validity Limit Exceeded
                        </span>
                        <span className="font-body-sm text-body-sm text-[#8C6328]/90 mt-0.5">
                          Tokens are invalidated upon expiry or when a newer dispatch request is
                          issued.
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-space-sm">
                      <button
                        type="button"
                        onClick={() => switchVerifyState('resend')}
                        className="w-full sm:w-auto px-space-lg py-2.5 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-space-2xs shadow-sm cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">refresh</span>
                        <span>Send New Verification Link</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigateScreen('AUTH-01-LOGIN')}
                        className="w-full sm:w-auto px-space-md py-2.5 rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors text-center cursor-pointer"
                      >
                        Return to Login
                      </button>
                    </div>
                  </div>
                )}

                {/* State 5: FAILED / INVALID */}
                {verifyState === 'failed' && (
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-20 h-20 mb-space-md flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-[#FAF0F1] opacity-80 blur-md"></div>
                      <div className="relative w-16 h-16 rounded-full bg-[#FAF0F1] text-[#8F3E46] flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[36px]">
                          error_outline
                        </span>
                      </div>
                      <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#8F3E46] text-surface-container-lowest flex items-center justify-center text-[12px] shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-space-xs py-0.5 rounded-full bg-[#FAF0F1] text-[#8F3E46] mb-space-xs font-label-sm text-label-sm font-semibold">
                      <span>Access Denied</span>
                      <span>•</span>
                      <span>403 Invariant</span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs">
                      Invalid verification token
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-space-lg">
                      This verification link is invalid, malformed, or has already been consumed.
                      For security, raw token signatures cannot be reused across active sessions.
                    </p>
                    <div className="w-full bg-[#FAF0F1] rounded-lg p-space-sm mb-space-lg text-left flex items-start gap-space-xs">
                      <span className="material-symbols-outlined text-[#8F3E46] text-[20px] shrink-0 mt-0.5">
                        gavel
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-[#8F3E46]">
                          Invariant Rule Enforced
                        </span>
                        <span className="font-body-sm text-body-sm text-[#8F3E46]/90 mt-0.5">
                          Protected Student routes (/courses, /placement, /live) remain completely
                          inaccessible until verification passes.
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-space-sm">
                      <button
                        type="button"
                        onClick={() => switchVerifyState('resend')}
                        className="w-full sm:w-auto px-space-md py-2.5 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-space-2xs shadow-sm cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          outgoing_mail
                        </span>
                        <span>Resend Email</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigateScreen('AUTH-01-LOGIN')}
                        className="w-full sm:w-auto px-space-md py-2.5 rounded-lg bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-variant transition-colors text-center shadow-sm cursor-pointer"
                      >
                        Return to Login
                      </button>
                    </div>
                  </div>
                )}

                {/* Institutional Security Notice Footer */}
                <div className="mt-space-xl pt-space-md border-t-0 bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between text-left">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      verified_user
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Single-use security token verification.
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-tertiary hidden sm:inline">
                    SHA-256 Auth
                  </span>
                </div>
              </div>

              {/* Student Support & Academic Guidance */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-between px-space-xs gap-space-xs text-center sm:text-left">
                <div className="flex items-center gap-space-2xs">
                  <span className="material-symbols-outlined text-tertiary text-[16px]">
                    contact_support
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Having trouble receiving mail?
                  </span>
                  <span className="font-label-sm text-label-sm text-primary hover:underline cursor-pointer">
                    Contact Academy Registrar
                  </span>
                </div>
                <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-tertiary">
                  <span>Student Route Guard (AUTH-02)</span>
                  <span>•</span>
                  <span>Build v2.4</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =================================================================== */}
      {/* SCREEN 3: LOGIN (AUTH-01-LOGIN)                                     */}
      {/* =================================================================== */}
      {screenId === 'AUTH-01-LOGIN' && (
        <main className="w-full bg-background flex-grow flex items-center justify-center py-space-xl">
          <div className="flex flex-col w-full">
            <div className="w-full max-w-7xl mx-auto px-margin py-space-md flex flex-col items-center">
              {/* State Inspector Controller / Interactive Showcase Dock */}
              <div className="w-full max-w-3xl mb-space-xl p-space-sm rounded-xl bg-surface-container-low shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px] text-primary">tune</span>
                  <span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface">
                    Screen State Inspector:
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
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
                        className={`px-space-xs py-1 rounded font-label-md text-label-md transition-all cursor-pointer ${
                          isActive
                            ? 'bg-primary text-on-primary shadow-sm'
                            : 'text-on-surface-variant bg-surface-container hover:text-on-surface'
                        }`}
                      >
                        {btn.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-space-xl">
                {/* Unified Login Form Card */}
                <section
                  aria-labelledby="login-header"
                  className="w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-md p-space-lg md:p-space-xl transition-all relative overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-secondary-fixed/30 blur-2xl pointer-events-none"></div>
                  <div className="mb-space-lg">
                    <div className="flex items-center gap-space-xs mb-space-2xs text-primary">
                      <span className="material-symbols-outlined text-[20px]">lock</span>
                      <span className="font-label-sm text-label-sm tracking-widest uppercase text-primary">
                        Institutional Gateway
                      </span>
                    </div>
                    <h1
                      className="font-headline-lg text-headline-lg text-on-surface tracking-tight"
                      id="login-header"
                    >
                      Welcome Back
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      Log in to your Teacher Theint English account
                    </p>
                  </div>

                  {/* State C: Invalid Credentials Alert */}
                  {loginState === 'invalid-creds' && (
                    <div className="mb-space-md p-space-sm rounded-lg bg-error-container text-on-error-container text-body-md font-body-md shadow-sm">
                      <div className="flex items-start gap-space-xs">
                        <span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5">
                          error
                        </span>
                        <div>
                          <p className="font-label-lg text-label-lg font-semibold text-error">
                            Authentication Failed
                          </p>
                          <p className="text-body-sm mt-0.5 text-on-error-container">
                            Incorrect email or password. Please check your credentials and try
                            again.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* State D: Unverified Student Notice */}
                  {loginState === 'unverified' && (
                    <div className="mb-space-md p-space-sm rounded-lg bg-surface-container-high text-on-surface shadow-sm">
                      <div className="flex items-start gap-space-xs">
                        <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                          mark_email_unread
                        </span>
                        <div className="space-y-1">
                          <p className="font-label-lg text-label-lg font-semibold text-primary">
                            Account Verification Required
                          </p>
                          <p className="text-body-sm text-on-surface-variant">
                            Your email address has not been verified yet. Institutional course
                            materials remain locked until validated.
                          </p>
                          <button
                            type="button"
                            onClick={() => onNavigateScreen('AUTH-03-VERIFY-EMAIL')}
                            className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-bold hover:underline mt-1 cursor-pointer"
                          >
                            <span>Verify Email Now</span>
                            <span className="material-symbols-outlined text-[16px]">
                              arrow_forward
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Form Element */}
                  <form className="space-y-space-md" noValidate onSubmit={handleLoginSubmit}>
                    {/* Field 1: Email Address */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="font-label-lg text-label-lg text-on-surface flex justify-between items-center"
                        htmlFor="email-input"
                      >
                        <span>Institutional Email</span>
                        {loginState === 'validation-error' && (
                          <span className="text-label-sm font-label-sm text-error">
                            Invalid format
                          </span>
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
                          className={`w-full h-11 px-space-sm pr-10 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline text-body-md font-body-md shadow-sm transition-all focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 ${
                            loginState === 'validation-error' ? 'ring-2 ring-error' : ''
                          }`}
                          required
                        />
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">
                          mail
                        </span>
                      </div>
                      {loginState === 'validation-error' && (
                        <p className="text-body-sm font-body-sm text-error mt-0.5 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">warning</span>
                          Please enter a valid academic or personal email address.
                        </p>
                      )}
                    </div>

                    {/* Field 2: Password */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center">
                        <label
                          className="font-label-lg text-label-lg text-on-surface"
                          htmlFor="password-input"
                        >
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => onNavigateScreen('AUTH-03-VERIFY-EMAIL')}
                          className="font-label-md text-label-md text-secondary hover:text-primary transition-colors focus:outline-none focus:underline cursor-pointer"
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
                          className={`w-full h-11 px-space-sm pr-12 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline text-body-md font-body-md shadow-sm transition-all focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 ${
                            loginState === 'validation-error' ? 'ring-2 ring-error' : ''
                          }`}
                          required
                        />
                        <button
                          aria-label="Toggle password visibility"
                          type="button"
                          onClick={() => setShowLoginPwd((prev) => !prev)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded flex items-center justify-center text-outline hover:text-on-surface transition-colors focus:outline-none cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {showLoginPwd ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                      {loginState === 'validation-error' && (
                        <p className="text-body-sm font-body-sm text-error mt-0.5 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">warning</span>
                          Password must be at least 8 characters.
                        </p>
                      )}
                    </div>

                    {/* Submission CTA */}
                    <div className="pt-space-xs">
                      <button
                        type="submit"
                        disabled={loginState === 'submitting'}
                        className={`w-full h-12 rounded-lg bg-primary hover:bg-secondary active:bg-on-primary-fixed-variant text-on-primary font-label-lg text-label-lg transition-all flex items-center justify-center gap-space-xs shadow-md shadow-primary/20 focus:outline-none focus:ring-4 focus:ring-primary-fixed cursor-pointer ${
                          loginState === 'submitting' ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      >
                        {loginState !== 'submitting' ? (
                          <span className="flex items-center gap-space-xs">
                            <span>Log In</span>
                            <span className="material-symbols-outlined text-[18px]">login</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-space-xs">
                            <span className="animate-spin material-symbols-outlined text-[20px]">
                              progress_activity
                            </span>
                            <span>Authenticating Identity...</span>
                          </span>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Secondary Institutional Path */}
                  <div className="mt-space-lg pt-space-md bg-surface-container-low rounded-lg p-space-sm text-center">
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Don&apos;t have an enrolled account?{' '}
                      <button
                        type="button"
                        onClick={() => onNavigateScreen('AUTH-02-REGISTER')}
                        className="font-label-lg text-label-lg text-primary hover:text-secondary font-bold underline transition-colors cursor-pointer"
                      >
                        Register as Student
                      </button>
                    </p>
                  </div>

                  {/* Inviolable Architecture Pill */}
                  <div className="mt-space-md flex items-center justify-center gap-1.5 text-tertiary">
                    <span className="material-symbols-outlined text-[14px]">
                      format_image_left
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider">
                      Unified Single Point of Access • TLS 1.3 Strict
                    </span>
                  </div>
                </section>

                {/* Architecture Explainer & Dispatch Resolution Card */}
                <aside
                  aria-label="Dispatch Architecture Matrix"
                  className="w-full max-w-md flex flex-col gap-space-md"
                >
                  <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg transition-all">
                    <div className="flex items-center justify-between pb-space-xs mb-space-sm">
                      <div className="flex items-center gap-space-xs">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                          Inviolable Model
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded text-on-surface-variant">
                        RBAC Deterministic
                      </span>
                    </div>
                    <p className="font-headline-md text-headline-md text-on-surface mb-1">
                      Single Entry, Strict Dispatch
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                      The platform forbids manual role pickers or subjective &ldquo;View As&rdquo;
                      selectors. Identity cryptographically decrees the operational environment.
                    </p>

                    {/* Mapping Matrix Items */}
                    <div className="space-y-space-xs">
                      {/* Student Route Target */}
                      <div
                        onClick={() => onNavigateScreen('STU-01-PORTAL')}
                        className="p-space-sm rounded-lg bg-surface-container-low transition-all flex items-center justify-between cursor-pointer hover:bg-surface-container"
                      >
                        <div className="flex items-center gap-space-xs">
                          <div className="w-8 h-8 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">school</span>
                          </div>
                          <div>
                            <div className="font-label-md text-label-md text-on-surface">
                              Student Profile
                            </div>
                            <div className="font-body-sm text-body-sm text-on-surface-variant">
                              Curriculum &amp; practice modules
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-label-sm text-label-sm px-2 py-1 rounded bg-surface-container font-mono text-primary font-bold">
                            STU-HOME-01
                          </span>
                          <div className="text-[10px] text-tertiary mt-0.5">/student/home</div>
                        </div>
                      </div>

                      {/* Teacher Route Target */}
                      <div
                        onClick={() => onNavigateScreen('TEA-01-PORTAL')}
                        className="p-space-sm rounded-lg bg-surface-container-low transition-all flex items-center justify-between cursor-pointer hover:bg-surface-container"
                      >
                        <div className="flex items-center gap-space-xs">
                          <div className="w-8 h-8 rounded-lg bg-surface-container-lowest text-secondary flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">
                              assignment_turned_in
                            </span>
                          </div>
                          <div>
                            <div className="font-label-md text-label-md text-on-surface">
                              Teacher Operational
                            </div>
                            <div className="font-body-sm text-body-sm text-on-surface-variant">
                              Grading queues &amp; cohorts
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-label-sm text-label-sm px-2 py-1 rounded bg-surface-container font-mono text-secondary font-bold">
                            TCH-DASH-01
                          </span>
                          <div className="text-[10px] text-tertiary mt-0.5">/teacher/console</div>
                        </div>
                      </div>

                      {/* Admin Route Target */}
                      <div
                        onClick={() => onNavigateScreen('ADM-01-PORTAL')}
                        className={`p-space-sm rounded-lg transition-all flex items-center justify-between cursor-pointer ${
                          loginState === 'dispatch'
                            ? 'ring-2 ring-primary bg-surface-container-highest'
                            : 'bg-surface-container-low hover:bg-surface-container'
                        }`}
                      >
                        <div className="flex items-center gap-space-xs">
                          <div className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">
                              admin_panel_settings
                            </span>
                          </div>
                          <div>
                            <div className="font-label-md text-label-md text-on-surface">
                              Admin Master
                            </div>
                            <div className="font-body-sm text-body-sm text-on-surface-variant">
                              Institutional telemetry &amp; security
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-label-sm text-label-sm px-2 py-1 rounded bg-surface-container font-mono text-on-surface font-bold">
                            ADM-DASH-01
                          </span>
                          <div className="text-[10px] text-tertiary mt-0.5">/admin/ops</div>
                        </div>
                      </div>
                    </div>

                    {/* Live Resolution Simulator Simulation Box */}
                    {loginState === 'dispatch' && (
                      <div className="mt-space-md p-space-sm rounded-lg bg-surface-container-high transition-all">
                        <div className="flex items-center justify-between text-on-surface-variant mb-1">
                          <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                            Dispatch Resolution In Action
                          </span>
                          <span className="text-body-sm font-body-sm">Status: 200 OK</span>
                        </div>
                        <div className="font-body-sm text-body-sm text-on-surface mb-2">
                          Identity payload decrypted: <strong>theint.director@theint.edu</strong>.
                          Inviolable Role:{' '}
                          <span className="text-primary font-bold">Admin Master</span>.
                        </div>
                        <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
                          <div className="bg-primary h-full w-full transition-all duration-700"></div>
                        </div>
                        <div className="mt-2 text-right">
                          <span className="font-label-sm text-label-sm text-primary font-bold">
                            Enforcing immediate transition to ADM-DASH-01...
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Academic Integrity Note Card */}
                  <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm">
                    <div className="flex gap-space-xs items-start">
                      <span className="material-symbols-outlined text-secondary text-[22px]">
                        policy
                      </span>
                      <div>
                        <h2 className="font-label-lg text-label-lg text-on-surface font-bold">
                          Strict Role Isolation Guarantee
                        </h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          Zero multi-tenancy leakage. Unverified registrations are quarantined
                          instantly at AUTH-02. Verified accounts route without prompting.
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
      <footer className="w-full bg-surface-container-low shadow-[0_-1px_6px_rgba(45,37,41,0.02)] py-space-lg pb-24">
        <div className="max-w-7xl mx-auto px-margin flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant">
          <div className="flex flex-col sm:flex-row items-center gap-space-xs sm:gap-space-md text-center sm:text-left">
            <span className="font-body-sm text-body-sm">
              © 2024 Teacher Theint English Academy. All institutional rights reserved.
            </span>
            <span className="hidden sm:inline text-outline-variant">•</span>
            <span className="font-body-sm text-body-sm text-tertiary">
              Accredited Modern Language Institute
            </span>
          </div>
          <div className="flex items-center gap-space-md font-body-sm text-body-sm">
            <span className="hover:text-primary transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-primary transition-colors cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-primary transition-colors cursor-pointer">
              Support Desk
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
