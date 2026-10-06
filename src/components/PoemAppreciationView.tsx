import React from 'react';
import { PoemAppreciation } from '../data/poemAppreciations';
import { Award, BookOpen, Heart, Feather, Sparkles, HelpCircle, Compass } from 'lucide-react';

interface PoemAppreciationViewProps {
  appreciation: PoemAppreciation;
}

export const PoemAppreciationView: React.FC<PoemAppreciationViewProps> = ({ appreciation }) => {
  const isMarathi = appreciation.subjectId === 'mar';
  const isHindi = appreciation.subjectId === 'hin';
  const isEnglish = appreciation.subjectId === 'eng';

  return (
    <div className="mt-8 pt-6 border-t-2 border-stone-300 space-y-6 text-left">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#2A2420] via-stone-900 to-[#1C1917] text-amber-100 rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden border border-amber-900/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
              {isMarathi ? '📜 संपूर्ण रसग्रहण व काव्यसौंदर्य' : isHindi ? '📜 पद्य विश्लेषण एवं काव्य सौंदर्य' : '📜 Critical Poem Appreciation'}
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/10 text-stone-300">
              {isMarathi ? '५ ते ८ गुण बोर्ड प्रश्न' : isHindi ? '५ अंक बोर्ड प्रश्न' : 'SSC Board 5 Marks'}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white tracking-wide">
            {appreciation.poemTitle}
          </h2>

          <p className="text-xs md:text-sm text-amber-200/90 font-serif leading-relaxed">
            {isMarathi 
              ? `कवी / कवयित्री: ${appreciation.poetName} • संदर्भ, यमक योजना, रसग्रहण, अलंकार व भाषिक सौंदर्य`
              : isHindi
                ? `रचनाकार: ${appreciation.poetName} • संदर्भ, विधा, अलंकार, केंद्रीय भाव एवं संदेश`
                : `Poet: ${appreciation.poetName} • Theme, Origin, Rhyme Scheme, Figures of Speech & Evaluation`}
          </p>
        </div>
      </div>

      {/* Main Content Box (Authentic Manuscript Paper) */}
      <div className="bg-white border-2 border-stone-850 rounded-3xl p-6 md:p-8 shadow-sm space-y-7">
        
        {/* 1. Basic Identifiers Grid */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
            <Feather className="w-4 h-4 text-amber-700" />
            <h4 className="font-serif font-bold text-stone-900 text-sm md:text-base">
              {isMarathi ? '१. कवितेचे प्राथमिक तपशील' : isHindi ? '१. पद्य प्राथमिक परिचय' : '1. Poem Credentials & Background'}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Title */}
            <div className="bg-[#FAF8F2] border border-stone-200 rounded-xl p-3.5 space-y-1">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-stone-500 block">
                {isMarathi ? 'कवितेचे नाव (Title):' : isHindi ? 'रचना (कविता) का नाम:' : 'Poem Title:'}
              </span>
              <p className="font-serif font-bold text-stone-900 text-sm md:text-base">
                {appreciation.poemTitle}
              </p>
            </div>

            {/* Poet */}
            <div className="bg-[#FAF8F2] border border-stone-200 rounded-xl p-3.5 space-y-1">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-stone-500 block">
                {isMarathi ? 'कवी / कवयित्रीचे नाव (Poet):' : isHindi ? 'रचनाकार / कवि का नाम:' : 'Poet / Author Name:'}
              </span>
              <p className="font-serif font-bold text-stone-900 text-sm md:text-base">
                {appreciation.poetName}
              </p>
            </div>

            {/* Source / Origin */}
            <div className="bg-[#FAF8F2] border border-stone-200 rounded-xl p-3.5 space-y-1 md:col-span-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-stone-500 block">
                {isMarathi ? 'संदर्भ / कविता कुठून घेतली आहे (Source / Origin):' : isHindi ? 'संदर्भ एवं स्रोत (रचना कहाँ से ली गई है):' : 'Where is it Taken From / Source:'}
              </span>
              <p className="font-sans text-xs md:text-sm text-stone-800 leading-relaxed font-medium">
                {appreciation.sourceOrOrigin}
              </p>
            </div>

            {/* Rhyme Scheme */}
            <div className="bg-[#FAF8F2] border border-stone-200 rounded-xl p-3.5 space-y-1 md:col-span-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-stone-500 block">
                {isMarathi ? 'वृत्त व यमक योजना (Rhyme Scheme / Meter):' : isHindi ? 'विधा एवं तुकान्त योजना (Rhyme Scheme):' : 'Rhyme Scheme & Meter:'}
              </span>
              <p className="font-sans text-xs md:text-sm text-amber-950 font-bold bg-amber-50/70 p-2.5 rounded-lg border border-amber-200">
                {appreciation.rhymeScheme}
              </p>
            </div>
          </div>
        </div>

        {/* 2. Central Idea / Summary */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <h4 className="font-serif font-bold text-stone-900 text-sm md:text-base">
              {isMarathi ? '२. कवितेची मध्यवर्ती कल्पना व संपूर्ण सारांश (२ गुण)' : isHindi ? '२. रचना का केंद्रीय भाव एवं सारांश (२ अंक)' : '2. Theme & Central Idea / Summary (2 Marks)'}
            </h4>
          </div>

          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 space-y-2">
            <p className="font-serif text-xs md:text-sm text-stone-900 leading-relaxed whitespace-pre-line font-medium">
              {appreciation.centralIdeaSummary}
            </p>
          </div>
        </div>

        {/* 3. Favorite Lines (Ornate Quote Card) */}
        {appreciation.favoriteLines && appreciation.favoriteLines.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
              <Heart className="w-4 h-4 text-rose-600" />
              <h4 className="font-serif font-bold text-stone-900 text-sm md:text-base">
                {isMarathi ? '३. कवितेतील आवडलेली ओळ' : isHindi ? '३. पसंदीदा काव्य पंक्तियाँ' : '3. Favorite Line(s)'}
              </h4>
            </div>

            <div className="border-l-4 border-amber-600 bg-[#FAF8F2] p-5 rounded-r-2xl space-y-1 shadow-2xs">
              {appreciation.favoriteLines.map((line, lIdx) => (
                <p key={lIdx} className="font-['Kalam'] text-sm md:text-base font-bold text-amber-950 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* 4. Figures of Speech (काव्यसौंदर्य / अलंकार) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <h4 className="font-serif font-bold text-stone-900 text-sm md:text-base">
              {isMarathi ? '४. कवितेतील अलंकार व काव्यसौंदर्य (Figures of Speech)' : isHindi ? '४. प्रयुक्त अलंकार एवं काव्य सौंदर्य' : '4. Figures of Speech & Poetic Devices (1 Mark)'}
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {appreciation.figuresOfSpeech.map((fig, fIdx) => (
              <div key={fIdx} className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-1.5">
                  <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-lg">
                    {fig.name}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">
                    {isMarathi ? 'अलंकार स्पष्टीकरण' : isHindi ? 'काव्य सौंदर्य' : 'Device Explanation'}
                  </span>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-stone-200 font-['Kalam'] text-xs md:text-sm text-stone-900 font-bold">
                  {fig.exampleLine}
                </div>

                <p className="text-xs md:text-sm text-stone-700 font-sans leading-relaxed">
                  <strong className="text-stone-900 font-semibold">{isMarathi ? 'स्पष्टीकरण: ' : isHindi ? 'स्पष्टीकरण: ' : 'Explanation: '}</strong>
                  {fig.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Poetic Style & Language Aesthetics */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
            <Compass className="w-4 h-4 text-amber-700" />
            <h4 className="font-serif font-bold text-stone-900 text-sm md:text-base">
              {isMarathi ? '५. भाषाशैली व भाषिक वैशिष्ट्ये' : isHindi ? '५. भाषा-शैली एवं रस-सौंदर्य' : '5. Language Style, Tone & Imagery'}
            </h4>
          </div>

          <div className="bg-[#FAF8F2] border border-stone-200 rounded-xl p-4">
            <p className="font-serif text-xs md:text-sm text-stone-800 leading-relaxed font-medium">
              {appreciation.poeticStyleAndTone}
            </p>
          </div>
        </div>

        {/* 6. Reason for Liking & Message */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Reason for Liking */}
          <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-900 block">
              {isMarathi ? '💡 कविता आवडण्याचे कारण:' : isHindi ? '💡 कविता पसंद आने का कारण:' : '💡 Why I Like This Poem:'}
            </span>
            <p className="font-serif text-xs md:text-sm text-stone-850 leading-relaxed font-medium">
              {appreciation.reasonForLiking}
            </p>
          </div>

          {/* Moral or Message */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-emerald-900 block">
              {isMarathi ? '🌟 कवितेतून मिळणारा जीवन संदेश:' : isHindi ? '🌟 रचना से प्राप्त प्रेरणा व नैतिक संदेश:' : '🌟 Moral Message & Life Value:'}
            </span>
            <p className="font-serif text-xs md:text-sm text-stone-850 leading-relaxed font-medium">
              {appreciation.moralOrMessage}
            </p>
          </div>
        </div>

        {/* 7. Board Exam Marks Allocation Table */}
        {appreciation.boardMarksAllocation && appreciation.boardMarksAllocation.length > 0 && (
          <div className="border border-stone-200 rounded-2xl overflow-hidden bg-stone-50">
            <div className="bg-stone-100 border-b border-stone-200 px-4 py-2 flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-stone-900">
                {isMarathi ? '📋 महाराष्ट्र राज्य मंडळ - रसग्रहण गुणदान योजना' : isHindi ? '📋 महाराष्ट्र राज्य बोर्ड - पद्य रसग्रहण अंक विभाजन' : '📋 Maharashtra State Board 5-Marks Scheme'}
              </span>
              <span className="text-[10px] font-mono font-bold text-amber-800">
                {isMarathi ? 'एकूण: ५ गुण' : isHindi ? 'कुल: ५ अंक' : 'Total: 5 Marks'}
              </span>
            </div>

            <div className="divide-y divide-stone-200 text-xs font-serif">
              {appreciation.boardMarksAllocation.map((item, mIdx) => (
                <div key={mIdx} className="px-4 py-2.5 flex items-center justify-between">
                  <span className="text-stone-700 font-medium">{item.criterion}</span>
                  <span className="font-mono font-bold text-stone-900 bg-white px-2 py-0.5 rounded border border-stone-200">
                    {item.marks}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
