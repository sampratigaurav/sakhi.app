'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/src/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent mb-4">
              SkillSakhi
            </h3>
            <p className="text-gray-400">
              {t('brandTagline')}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footerQuickLinks')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-orange-500 transition-colors">
                  {t('footerHome')}
                </Link>
              </li>
              <li>
                <Link href="/find-services" className="hover:text-orange-500 transition-colors">
                  {t('footerFindServices')}
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-orange-500 transition-colors">
                  {t('footerRegister')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footerContact')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>{t('footerEmailLine')}</li>
              <li>{t('footerPhoneLine')}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="flex items-center justify-center">
            {t('footerMadeWithLove')}{' '}
            <Heart className="w-4 h-4 mx-1 text-red-500 fill-red-500" />
          </p>
          <p className="mt-2">{t('footerCopyright')}</p>
        </div>
      </div>
    </footer>
  );
}
