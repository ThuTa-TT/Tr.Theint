/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LanguageCode, ScreenId } from './types/navigation';
import { PublicScreens } from './components/screens/public/PublicScreens';
import { AuthScreens } from './components/screens/auth/AuthScreens';
import { StudentPortalScreen } from './components/screens/student/StudentPortalScreen';
import { TeacherPortalScreen } from './components/screens/teacher/TeacherPortalScreen';
import { AdminPortalScreen } from './components/screens/admin/AdminPortalScreen';
import { StitchScreenDock } from './components/audit/StitchScreenDock';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('PUB-01-HOME');
  const [language, setLanguage] = useState<LanguageCode>('EN');
  const [showSpecGuides, setShowSpecGuides] = useState<boolean>(false);

  const handleNavigateScreen = (screenId: ScreenId) => {
    setCurrentScreen(screenId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fff8f8] text-[#22191b] font-['Nunito_Sans']">
      {/* Selected Public & Student Free Learning Screens */}
      {(currentScreen === 'PUB-01-HOME' ||
        currentScreen === 'PUB-02-COURSES' ||
        currentScreen === 'PUB-03-COURSE-DETAIL' ||
        currentScreen === 'STU-COURSE-03-STRUCTURE' ||
        currentScreen === 'STU-FREE-01' ||
        currentScreen === 'STU-LEARN-01' ||
        currentScreen === 'STU-LESSON-01' ||
        currentScreen === 'STU-EX-01' ||
        currentScreen === 'STU-PLACE-02' ||
        currentScreen === 'STU-EX-02' ||
        currentScreen === 'STU-EX-03' ||
        currentScreen === 'PUB-04-BLOG' ||
        currentScreen === 'PUB-05-ABOUT') && (
        <PublicScreens
          screenId={currentScreen}
          language={language}
          onLanguageChange={setLanguage}
          onNavigateScreen={handleNavigateScreen}
          showSpecGuides={showSpecGuides}
        />
      )}

      {/* Selected Authentication Screens (Login, Register, Email Verification) */}
      {(currentScreen === 'AUTH-01-LOGIN' ||
        currentScreen === 'AUTH-02-REGISTER' ||
        currentScreen === 'AUTH-03-VERIFY-EMAIL') && (
        <AuthScreens
          screenId={currentScreen}
          language={language}
          onLanguageChange={setLanguage}
          onNavigateScreen={handleNavigateScreen}
          showSpecGuides={showSpecGuides}
        />
      )}

      {/* Selected Authenticated Student Portal Screen (9 Canonical Student Nav Items) */}
      {currentScreen === 'STU-01-PORTAL' && (
        <StudentPortalScreen
          onNavigateScreen={handleNavigateScreen}
          showSpecGuides={showSpecGuides}
        />
      )}

      {/* Selected Authenticated Teacher Portal Screen (9 Canonical Teacher Nav Items) */}
      {currentScreen === 'TEA-01-PORTAL' && (
        <TeacherPortalScreen
          onNavigateScreen={handleNavigateScreen}
          showSpecGuides={showSpecGuides}
        />
      )}

      {/* Selected Authenticated Admin Console Screen (19 Canonical Admin Nav Items) */}
      {currentScreen === 'ADM-01-PORTAL' && (
        <AdminPortalScreen
          onNavigateScreen={handleNavigateScreen}
          showSpecGuides={showSpecGuides}
        />
      )}

      {/* Collapsible Bottom Screen Switcher & Navbar Consistency Audit Dock */}
      <StitchScreenDock
        currentScreen={currentScreen}
        onSelectScreen={handleNavigateScreen}
        showSpecGuides={showSpecGuides}
        onToggleSpecGuides={() => setShowSpecGuides((prev) => !prev)}
      />
    </div>
  );
}
