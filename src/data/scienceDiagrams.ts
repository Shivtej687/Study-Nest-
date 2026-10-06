export interface DiagramCallout {
  id: string;
  label: string;
  positionDescription?: string;
  roleOrFunction: string;
  boardKeyPoint: string;
}

export interface HandwrittenDiagram {
  id: string;
  title: string;
  marks: number;
  boardReference?: string;
  difficulty?: 'High Frequency' | 'Board Mandatory' | 'Concept Core';
  caption: string;
  diagramCategory: 'Anatomy / Morphology' | 'Physiological Process' | 'Flowchart / Cycle' | 'Schematic / Apparatus';
  svgType: string;
  labels: DiagramCallout[];
  stepByStepExplanation: string[];
  drawingGuidelines: string[];
  examQuestionsAsked: string[];
  goldenNote?: string;
}

export const SCIENCE_HANDWRITTEN_DIAGRAMS: Record<string, HandwrittenDiagram[]> = {
  // =========================================================================
  // SCIENCE 2 (BIOLOGY + ENVIRONMENT)
  // =========================================================================

  'Heredity and Evolution': [
    {
      id: 'heredity-diag-1',
      title: 'Diagram 1: Central Dogma of Molecular Biology — Transcription, Translation & Translocation',
      marks: 4,
      boardReference: 'SSC Board March 2024 / July 2022 / Textbook Page 1–2',
      difficulty: 'Board Mandatory',
      caption: 'Schematic representation of genetic information flow: DNA unzipping, mRNA synthesis, tRNA anticodon codon-pairing on ribosome, and peptide bond synthesis with translocation.',
      diagramCategory: 'Physiological Process',
      svgType: 'central-dogma',
      labels: [
        {
          id: 'lbl-1',
          label: 'DNA Template Strand (3\' to 5\')',
          positionDescription: 'Upper unwound strand in nucleus',
          roleOrFunction: 'Serves as the master template for mRNA synthesis according to base pairing rules (A pairs with U in RNA, G with C).',
          boardKeyPoint: 'Only ONE strand of DNA acts as template during transcription.'
        },
        {
          id: 'lbl-2',
          label: 'RNA Polymerase Enzyme',
          positionDescription: 'Enzyme complex moving along DNA',
          roleOrFunction: 'Catalyzes the formation of single-stranded messenger RNA (mRNA) complementary to DNA template.',
          boardKeyPoint: 'RNA contains Uracil (U) in place of Thymine (T).'
        },
        {
          id: 'lbl-3',
          label: 'Messenger RNA (mRNA) with Triplet Codons',
          positionDescription: 'Single strand emerging from nucleus into cytoplasm',
          roleOrFunction: 'Carries the genetic message in sequences of 3 nucleotides called "Triplet Codons".',
          boardKeyPoint: 'Discovered by Dr. Har Gobind Khorana (Nobel Prize 1968 for deciphering triplet codons).'
        },
        {
          id: 'lbl-4',
          label: 'Ribosome (rRNA + Protein)',
          positionDescription: 'Two ribosomal subunits clamping onto mRNA',
          roleOrFunction: 'Acts as molecular workbench holding mRNA in place and catalyzing peptide bond formation between adjacent amino acids.',
          boardKeyPoint: 'Contains A-site (aminoacyl) and P-site (peptidyl).'
        },
        {
          id: 'lbl-5',
          label: 'Transfer RNA (tRNA) with Anticodon Loop',
          positionDescription: 'Clover-leaf shaped adaptor molecules',
          roleOrFunction: 'Carries a specific activated amino acid at 3\' CCA end and has an Anticodon loop complementary to the mRNA codon.',
          boardKeyPoint: 'Matches mRNA codon (e.g. AUG matches anticodon UAC).'
        },
        {
          id: 'lbl-6',
          label: 'Growing Polypeptide Chain (Protein)',
          positionDescription: 'Chain of beads emerging from top of ribosome',
          roleOrFunction: 'Peptide bonds formed by peptidyl transferase link amino acids into a functional protein fold.',
          boardKeyPoint: 'Bond: -CO-NH- (Peptide linkage).'
        },
        {
          id: 'lbl-7',
          label: 'Translocation Movement',
          positionDescription: 'Arrow showing ribosome shifting to the right',
          roleOrFunction: 'During translation, the ribosome moves along the mRNA strand by the distance of ONE triplet codon.',
          boardKeyPoint: 'Definition: "The movement of ribosome over mRNA by one triplet codon distance is called Translocation".'
        }
      ],
      stepByStepExplanation: [
        '1. Transcription (in Nucleus): The DNA double helix uncoils. Enzyme RNA Polymerase produces single-stranded mRNA complementary to one DNA strand. Uracil (U) replaces Thymine (T).',
        '2. mRNA Export: The synthesized mRNA exits through nuclear pores into the cytoplasm carrying thousands of triplet codons.',
        '3. Translation Initiation (in Cytoplasm): The small and large subunits of the ribosome bind to the start codon AUG (Methionine).',
        '4. Codon-Anticodon Pairing: tRNA molecules with complementary anticodons bring specific amino acids as per the genetic code.',
        '5. Peptide Bond Formation: Peptidyl transferase links the incoming amino acid to the growing peptide chain via peptide bonds.',
        '6. Translocation: The ribosome moves forward by exactly one triplet codon (translocation) until a stop codon (UAA, UAG, UGA) is reached, releasing the mature protein.'
      ],
      drawingGuidelines: [
        'Draw the double-stranded DNA unzipping in the left upper corner.',
        'Show mRNA strand with spaced 3-letter triplets: AUG, GUC, CCA, etc.',
        'Draw the two ribosome oval subunits clamping around the mRNA strand.',
        'Draw tRNA as a clover-leaf with 3 prongs at bottom (anticodon) and a sphere on top (amino acid).',
        'Draw a prominent horizontal arrow beneath the ribosome labeled "Translocation (1 triplet codon distance)".',
        'Always use a sharp HB pencil and label on the right side using ruler guide lines.'
      ],
      examQuestionsAsked: [
        'Draw a neat labeled diagram of Transcription, Translation and Translocation. (3/4 Marks)',
        'Define Translocation and Triplet Codon. (2 Marks)',
        'Explain the process of protein synthesis with the help of a suitable diagram. (4 Marks)'
      ],
      goldenNote: 'Translocation is the most frequently tested definition in the chapter! Remember: 1 Triplet Codon = 3 Nucleotides = Codes for 1 Amino Acid.'
    },
    {
      id: 'heredity-diag-2',
      title: 'Diagram 2: Anatomical Evidences of Evolution — Homologous Forelimb Bones',
      marks: 3,
      boardReference: 'SSC Board July 2023 / Page 4',
      difficulty: 'High Frequency',
      caption: 'Comparative anatomical study of forelimbs: Human hand, Foreleg of Cat, Flipper of Whale, and Patagium (wing) of Bat showing identical skeletal bone architecture.',
      diagramCategory: 'Anatomy / Morphology',
      svgType: 'homologous-forelimbs',
      labels: [
        {
          id: 'lbl-humerus',
          label: 'Humerus (Upper Arm Bone)',
          positionDescription: 'Proximal single long bone',
          roleOrFunction: 'Articulates with shoulder girdle; present in identical position across all 4 mammals.',
          boardKeyPoint: 'Identical developmental origin from embryonic mesoderm.'
        },
        {
          id: 'lbl-radius-ulna',
          label: 'Radius and Ulna (Forearm Bones)',
          positionDescription: 'Pair of parallel bones in middle segment',
          roleOrFunction: 'Provides rotational flexibility and forearm support.',
          boardKeyPoint: 'Conserved across walking, flying, swimming, and grasping species.'
        },
        {
          id: 'lbl-carpals',
          label: 'Carpals (Wrist Bones)',
          positionDescription: 'Cluster of small pebble-like bones',
          roleOrFunction: 'Provides articulatory joint motion for hand/flipper.',
          boardKeyPoint: 'Number of carpals remains structurally homologous.'
        },
        {
          id: 'lbl-metacarpals-phalanges',
          label: 'Metacarpals & Phalanges (Digits / Fingers)',
          positionDescription: 'Elongated distal finger bones',
          roleOrFunction: 'Adapted for specific functions: Human (fine grip), Cat (walking/running), Whale (steering paddle), Bat (wing membrane support).',
          boardKeyPoint: 'Different external functions, but identical internal bone arrangement proves common ancestry!'
        }
      ],
      stepByStepExplanation: [
        '1. Homologous Organs Definition: Organs having identical internal anatomical structure and embryological origin, but modified to perform different functions in different organisms.',
        '2. Bone Constancy: Although the external appearance and function of human hand (grasping), cat leg (walking), whale flipper (swimming), and bat wing (flying) are totally different, each possesses the exact same sequence of bones: Humerus ➔ Radius-Ulna ➔ Carpals ➔ Metacarpals ➔ Phalanges.',
        '3. Evolutionary Conclusion: This profound structural homology proves beyond doubt that all these mammals evolved through divergent evolution from a single common mammalian ancestor.'
      ],
      drawingGuidelines: [
        'Draw the 4 limbs side by side: Human, Cat, Whale, Bat.',
        'Shade or color the corresponding bones identically (e.g. stipple Humerus, cross-hatch Radius-Ulna).',
        'Add dotted horizontal alignment lines connecting Humerus to Humerus, Radius to Radius.',
        'Label all 4 bone groups clearly on the right hand side.'
      ],
      examQuestionsAsked: [
        'Give anatomical evidence of evolution with the help of a suitable diagram. (3 Marks)',
        'Differentiate between Homologous organs and Analogous organs with examples. (2 Marks)'
      ],
      goldenNote: 'Homologous = Same structure, different function (Proves divergent evolution). Analogous = Different structure, same function (e.g. bird wing vs insect wing, proves convergent evolution).'
    }
  ],

  'Life Processes in Living Organisms — Part 1': [
    {
      id: 'lp1-diag-1',
      title: 'Diagram 1: Cellular Respiration Flowchart — Glycolysis, Krebs Cycle (TCA), and ETC',
      marks: 4,
      boardReference: 'SSC Board March 2024 / July 2022 / Textbook Page 13',
      difficulty: 'Board Mandatory',
      caption: 'Three-stage aerobic cellular respiration pathway showing Glycolysis in Cytoplasm, Krebs Cycle (TCA) in Mitochondria Matrix, and Electron Transfer Chain (ETC) producing 38 ATP molecules.',
      diagramCategory: 'Flowchart / Cycle',
      svgType: 'cellular-respiration',
      labels: [
        {
          id: 'lbl-cr-1',
          label: 'Glycolysis (EMP Pathway in Cytoplasm)',
          positionDescription: 'Cytosolic phase outside mitochondria',
          roleOrFunction: 'Stepwise oxidation of 1 molecule of Glucose (6C) into 2 molecules of Pyruvic Acid (3C), producing 2 ATP and 2 NADH₂.',
          boardKeyPoint: 'EMP pathway occurs in both aerobic and anaerobic respiration without requiring Oxygen.'
        },
        {
          id: 'lbl-cr-2',
          label: 'Formation of Acetyl-Coenzyme-A',
          positionDescription: 'Transition step entering mitochondria',
          roleOrFunction: 'Each Pyruvic acid (3C) loses one CO₂ (decarboxylation) to form 2 molecules of Acetyl-CoA (2C) + 2 NADH₂.',
          boardKeyPoint: 'Acetyl-CoA is the golden molecular bridge between cytoplasm and mitochondria.'
        },
        {
          id: 'lbl-cr-3',
          label: 'Tricarboxylic Acid Cycle (Krebs Cycle / Citric Acid Cycle)',
          positionDescription: 'Circular enzymatic cycle in Mitochondrial Matrix',
          roleOrFunction: 'Cyclic degradation of Acetyl portion of Acetyl-CoA into CO₂, generating 2 ATP, 6 NADH₂, and 2 FADH₂.',
          boardKeyPoint: 'Discovered by Sir Hans Krebs (Nobel Prize 1953).'
        },
        {
          id: 'lbl-cr-4',
          label: 'Electron Transfer Chain (ETC Reaction)',
          positionDescription: 'Inner Mitochondrial Membrane (Cristae)',
          roleOrFunction: 'Electrons and protons from NADH₂ and FADH₂ pass through cytochromes; Oxygen acts as final electron acceptor forming water (H₂O).',
          boardKeyPoint: '1 NADH₂ yields 3 ATP ; 1 FADH₂ yields 2 ATP.'
        },
        {
          id: 'lbl-cr-5',
          label: 'Total Net Energy Yield: 38 ATP',
          positionDescription: 'Bottom output box',
          roleOrFunction: 'Complete aerobic combustion of 1 glucose molecule releases 38 ATP molecules + 6 CO₂ + 6 H₂O.',
          boardKeyPoint: 'Net equation: C₆H₁₂O₆ + 6O₂ ⟶ 6CO₂ + 6H₂O + 38 ATP.'
        }
      ],
      stepByStepExplanation: [
        'Stage 1: Glycolysis (in Cytoplasm): Glucose (6-Carbon) ⟶ 2 Pyruvic acid (3-Carbon) + 2 ATP + 2 NADH₂ + 2 H₂O.',
        'Stage 2: Link Reaction: 2 Pyruvic acid ⟶ 2 Acetyl-CoA (2-Carbon) + 2 CO₂ + 2 NADH₂.',
        'Stage 3: Krebs Cycle (in Mitochondrial Matrix): Acetyl-CoA enters the cyclic reaction. Acetyl group is completely oxidized to 4 CO₂ + 2 ATP + 6 NADH₂ + 2 FADH₂.',
        'Stage 4: Electron Transfer Chain (on Mitochondrial Cristae): High-energy electrons from NADH₂ and FADH₂ are transferred to oxygen, synthesizing ATP by oxidative phosphorylation:',
        '  • 10 NADH₂ × 3 ATP = 30 ATP',
        '  • 2 FADH₂ × 2 ATP = 4 ATP',
        '  • Substrate-level phosphorylation = 4 ATP',
        '  • Total Net ATP Produced = 38 ATP!'
      ],
      drawingGuidelines: [
        'Draw an outer boundary representing the Cell / Cytoplasm.',
        'Draw an inner bean-shaped organelle with inner folded cristae representing the Mitochondrion.',
        'Draw a linear top arrow: Glucose (6C) ➔ Pyruvic acid (3C) in cytoplasm.',
        'Draw arrow crossing outer mitochondrial membrane labeled Acetyl-CoA (2C).',
        'Draw a circular Krebs Cycle inside the mitochondrial matrix with CO₂, NADH₂, FADH₂ spinning out.',
        'Draw ETC along the cristae folds culminating in ATP synthesis and H₂O release.'
      ],
      examQuestionsAsked: [
        'Draw a neat flow chart of aerobic respiration of glucose. (3 Marks)',
        'What is Glycolysis? State the site where it takes place and write products formed. (3 Marks)',
        'Calculate the total number of ATP molecules produced in complete oxidation of 1 molecule of glucose. (2 Marks)'
      ],
      goldenNote: 'Remember ATP conversion rates: 1 NADH₂ = 3 ATP, while 1 FADH₂ = 2 ATP. This numerical conversion is tested in every alternative board exam!'
    },
    {
      id: 'lp1-diag-2',
      title: 'Diagram 2: Four Stages of Mitosis — Prophase, Metaphase, Anaphase, Telophase',
      marks: 4,
      boardReference: 'SSC Board March 2023 / Page 18–19',
      difficulty: 'Board Mandatory',
      caption: 'Equational somatic cell division maintaining diploid chromosome number (2n ➔ 2n) across 4 successive karyokinesis stages and cytokinesis.',
      diagramCategory: 'Physiological Process',
      svgType: 'mitosis-stages',
      labels: [
        {
          id: 'lbl-prophase',
          label: 'Prophase (Condensation Stage)',
          positionDescription: 'First phase circle',
          roleOrFunction: 'Thin thread-like chromatin fibers condense into distinct chromosomes with sister chromatids joined at centromere; nucleolus and nuclear membrane begin to disintegrate; centrioles move to opposite poles.',
          boardKeyPoint: 'Nuclear membrane completely disappears at the end of Prophase.'
        },
        {
          id: 'lbl-metaphase',
          label: 'Metaphase (Equatorial Alignment Stage)',
          positionDescription: 'Second phase circle',
          roleOrFunction: 'All condensed chromosomes align themselves neatly along the equatorial plane (metaphase plate) of the cell; spindle fibers attach to the centromere of each chromosome.',
          boardKeyPoint: 'Chromosomes are most visible and best studied under the microscope in Metaphase.'
        },
        {
          id: 'lbl-anaphase',
          label: 'Anaphase (Centromere Splitting & Migration)',
          positionDescription: 'Third phase circle',
          roleOrFunction: 'Centromeres split, and sister chromatids separate into daughter chromosomes; spindle fibers contract, pulling daughter chromosomes to opposite poles; chromosomes look like bunch of bananas (V, L, J, I shapes).',
          boardKeyPoint: 'Centromeres split only in Anaphase.'
        },
        {
          id: 'lbl-telophase',
          label: 'Telophase (Reconstitution of Nuclei)',
          positionDescription: 'Fourth phase circle',
          roleOrFunction: 'Daughter chromosomes reach opposite poles and uncoil back into thin chromatin threads; nuclear membrane reforms around each cluster; nucleoli reappear; two daughter nuclei formed in one cell.',
          boardKeyPoint: 'Exact reverse of Prophase.'
        },
        {
          id: 'lbl-cytokinesis',
          label: 'Cytokinesis (Cell Cleavage)',
          positionDescription: 'Division of cytoplasm',
          roleOrFunction: 'In animal cells: A notch/furrow appears at the equator that deepens to cleave cell into two. In plant cells: A cell plate forms at the center along equatorial plane.',
          boardKeyPoint: 'Plant cells: Cell plate forms; Animal cells: Furrowing.'
        }
      ],
      stepByStepExplanation: [
        '1. Prophase: Chromatin condenses into visible paired chromatids. Centrioles duplicate and move to poles. Nucleolus and nuclear envelope break down.',
        '2. Metaphase: Spindle apparatus is fully formed. Chromosomes align precisely along the central equatorial plate. Spindle fibers link kinetochores to spindle poles.',
        '3. Anaphase: Rapid pulling force breaks the centromeres. Sister chromatids migrate toward opposite poles as V-shaped daughter chromosomes.',
        '4. Telophase: Chromosomes decondense. Two distinct nuclear envelopes reform at both poles. Spindle fibers dissolve.',
        '5. Cytokinesis: Cytoplasmic division splits the mother cell into two genetically identical daughter cells, each retaining the original diploid (2n) count.'
      ],
      drawingGuidelines: [
        'Draw 4 circular/oval cells sequentially labeled Prophase, Metaphase, Anaphase, Telophase.',
        'In Prophase: Draw dotted boundary for disintegrating nuclear membrane and condensed X-shaped chromosomes.',
        'In Metaphase: Draw a horizontal dotted equatorial line; draw 4 chromosomes aligned right along the line with spindle fibers radiating from poles.',
        'In Anaphase: Draw sister chromatids split apart into < and > shapes being pulled away from center.',
        'In Telophase: Draw a peanut-shaped pinching cell containing two distinct circular nuclei inside.',
        'Clearly label: Centromere, Spindle Fiber, Equatorial Plate, Sister Chromatid, Furrow.'
      ],
      examQuestionsAsked: [
        'Sketch and label the phases of Mitosis. (4 Marks)',
        'In which phase of mitosis do chromosomes align on equatorial plane? (1 Mark)',
        'Distinguish between Cytokinesis in plant cell and animal cell. (2 Marks)'
      ],
      goldenNote: 'Mnemonic to memorize the sequence: PMAT (Prophase, Metaphase, Anaphase, Telophase). In Metaphase, remember "M" for Middle (Equator); in Anaphase, remember "A" for Away (moving to poles)!'
    }
  ],

  'Life Processes in Living Organisms — Part 2': [
    {
      id: 'lp2-diag-1',
      title: 'Diagram 1: Human Male Reproductive System',
      marks: 4,
      boardReference: 'SSC Board March 2024 / Page 28',
      difficulty: 'Board Mandatory',
      caption: 'Sagittal anatomical section of human male reproductive system displaying testes, scrotum, epididymis, vas deferens, accessory sex glands, and urethra.',
      diagramCategory: 'Anatomy / Morphology',
      svgType: 'male-reproductive',
      labels: [
        {
          id: 'lbl-mr-testis',
          label: 'Testis (in Scrotum)',
          positionDescription: 'Oval organ located outside abdominal cavity',
          roleOrFunction: 'Primary male sex organ; produces sperms (spermatogenesis in seminiferous tubules) and secretes male hormone Testosterone.',
          boardKeyPoint: 'Scrotum maintains temperature 2 to 2.5°C lower than internal body temperature, essential for viable sperm production.'
        },
        {
          id: 'lbl-mr-epididymis',
          label: 'Epididymis',
          positionDescription: 'Coiled tube cap on posterior side of testis (~6 meters long)',
          roleOrFunction: 'Stores immature sperms and provides physiological maturation and motility.',
          boardKeyPoint: 'Sperms become motile and fertile in the epididymis.'
        },
        {
          id: 'lbl-mr-vas-deferens',
          label: 'Vas Deferens (Sperm Duct)',
          positionDescription: 'Long ascending tube looping over urinary bladder',
          roleOrFunction: 'Transports mature spermatozoa from epididymis towards the ejaculatory duct via peristaltic contractions.',
          boardKeyPoint: 'Cut and ligated during male surgical contraception (Vasectomy).'
        },
        {
          id: 'lbl-mr-seminal-vesicles',
          label: 'Seminal Vesicles (Pair)',
          positionDescription: 'Glands located behind urinary bladder',
          roleOrFunction: 'Secretes alkaline, fructose-rich seminal fluid (provides 60% of semen volume and energy for sperm motility).',
          boardKeyPoint: 'Fructose in seminal fluid serves as fuel for sperm mitochondria.'
        },
        {
          id: 'lbl-mr-prostate',
          label: 'Prostate Gland (Single)',
          positionDescription: 'Chestnut-sized gland encircling base of urethra',
          roleOrFunction: 'Secretes milky, slightly alkaline fluid that neutralizes the acidic environment of the vagina, protecting sperm vitality.',
          boardKeyPoint: 'Enlarges in older males causing urinary obstruction.'
        },
        {
          id: 'lbl-mr-cowper',
          label: 'Cowper\'s (Bulbourethral) Glands',
          positionDescription: 'Pea-sized paired glands below prostate',
          roleOrFunction: 'Secretes clear, viscous lubricating mucus prior to ejaculation that cleanses residual urine from urethra.',
          boardKeyPoint: 'Neutralizes urethral acidity.'
        },
        {
          id: 'lbl-mr-urethra',
          label: 'Urinogenital Duct (Urethra)',
          positionDescription: 'Common duct passing through penis',
          roleOrFunction: 'Common passage for both urine and semen in human males.',
          boardKeyPoint: 'Carries both urine and semen, but NEVER at the same time.'
        },
        {
          id: 'lbl-mr-penis',
          label: 'Penis (Copulatory Organ)',
          positionDescription: 'External erectile organ',
          roleOrFunction: 'Introduces sperms into the female vagina during insemination.',
          boardKeyPoint: 'Contains vascular erectile tissue.'
        }
      ],
      stepByStepExplanation: [
        '1. Spermatogenesis: Sperms are produced continuously in the seminiferous tubules of the testes from puberty onwards under the control of FSH and Testosterone.',
        '2. Maturation & Storage: Non-motile sperms travel into the epididymis (~6m tightly coiled tube) where they gain motility and are temporarily stored.',
        '3. Conduction: During ejaculation, peristalsis pushes sperms through the vas deferens, which ascends into the pelvic cavity and loops around the urinary bladder.',
        '4. Glandular Secretions (Semen Formation): Seminal vesicles add fructose-rich fluid; the prostate gland adds milky alkaline fluid; Cowper\'s glands add lubricating mucus. The mixture of sperms + glandular fluids is called Semen.',
        '5. Ejaculation: Semen travels through the urinogenital duct (urethra) passing through the penis and is discharged through the external urethral orifice.'
      ],
      drawingGuidelines: [
        'Draw the outline of the pelvis, urinary bladder, and erectile penis.',
        'Draw the oval testis suspended in the pouch-like scrotum.',
        'Draw the coiled epididymis capping the testis.',
        'Trace the smooth curving vas deferens looping over the urinary bladder.',
        'Draw the lobular seminal vesicle behind bladder, the donut-shaped prostate encircling urethra, and pea-shaped Cowper\'s glands beneath.',
        'Label: Testis, Scrotum, Epididymis, Vas Deferens, Seminal Vesicle, Prostate Gland, Cowper\'s Gland, Urinogenital Duct, Penis.'
      ],
      examQuestionsAsked: [
        'Draw a neat labeled diagram of human male reproductive system. (4 Marks)',
        'State the function of: 1) Testis, 2) Prostate gland, 3) Seminal vesicle. (3 Marks)',
        'Why are the testes located outside the abdominal cavity in the scrotum? (2 Marks)'
      ],
      goldenNote: 'Board Favorite: "Why are testes extra-abdominal?" Answer: Spermatogenesis requires a temperature 2–2.5°C lower than internal body temperature (37°C), which the scrotum provides by contracting or relaxing.'
    },
    {
      id: 'lp2-diag-2',
      title: 'Diagram 2: Human Female Reproductive System',
      marks: 4,
      boardReference: 'SSC Board March 2023 / Page 29',
      difficulty: 'Board Mandatory',
      caption: 'Frontal schematic view of female internal reproductive tract displaying paired ovaries, oviducts (fallopian tubes), uterus, endometrium, cervix, and vagina.',
      diagramCategory: 'Anatomy / Morphology',
      svgType: 'female-reproductive',
      labels: [
        {
          id: 'lbl-fr-ovary',
          label: 'Pair of Ovaries',
          positionDescription: 'Almond-shaped organs on either side of lower abdomen',
          roleOrFunction: 'Primary female gonads; produce mature ovum (oogenesis) and secrete female sex hormones Estrogen and Progesterone.',
          boardKeyPoint: 'Alternate ovaries release one mature ovum every 28 days.'
        },
        {
          id: 'lbl-fr-fimbriae',
          label: 'Fimbriae & Infundibulum',
          positionDescription: 'Finger-like fringe at funnel-shaped opening of oviduct',
          roleOrFunction: 'Captures and sweeps the ovum released during ovulation from the ovary into the fallopian tube.',
          boardKeyPoint: 'Ciliated epithelial cells push ovum towards uterus.'
        },
        {
          id: 'lbl-fr-fallopian',
          label: 'Fallopian Tube (Oviduct)',
          positionDescription: 'Ciliated muscular tubes (~10–12 cm) connecting ovary to uterus',
          roleOrFunction: 'Site of fertilization where sperm meets ovum (specifically at the ampullary-isthmic junction).',
          boardKeyPoint: 'Fertilization strictly occurs inside the fallopian tube, NOT in the uterus!'
        },
        {
          id: 'lbl-fr-uterus',
          label: 'Uterus (Womb)',
          positionDescription: 'Inverted pear-shaped hollow muscular organ',
          roleOrFunction: 'Nurtures and houses the developing embryo/fetus during the 9 months of gestation/pregnancy.',
          boardKeyPoint: 'Inner vascular layer is called Endometrium.'
        },
        {
          id: 'lbl-fr-endometrium',
          label: 'Endometrium (Uterine Lining)',
          positionDescription: 'Innermost highly vascular mucous membrane',
          roleOrFunction: 'Thickens each month under influence of Progesterone to receive fertilized blastocyst; sheds during menstruation if fertilization does not occur.',
          boardKeyPoint: 'Site of embryo implantation and placenta formation.'
        },
        {
          id: 'lbl-fr-cervix',
          label: 'Cervix',
          positionDescription: 'Narrow neck/lower constriction of uterus',
          roleOrFunction: 'Connects uterus to vagina; dilates during childbirth (parturition).',
          boardKeyPoint: 'Produces cervical mucus plug during pregnancy.'
        },
        {
          id: 'lbl-fr-vagina',
          label: 'Vagina (Birth Canal)',
          positionDescription: 'Muscular elastic tube (~7.5–10 cm)',
          roleOrFunction: 'Receives penis and semen during intercourse; serves as the birth canal during delivery and exit route for menstrual flow.',
          boardKeyPoint: 'Acidic pH due to Lactobacillus bacteria prevents infection.'
        }
      ],
      stepByStepExplanation: [
        '1. Oogenesis & Ovulation: At birth, female ovaries contain 2 to 4 million immature oocytes. From puberty to menopause, one oocyte matures and is released alternately by one ovary every 28 days (Ovulation on Day 14).',
        '2. Ovum Transport: Finger-like fimbriae catch the ovulated ovum. Cilia lining the fallopian tube sweep the ovum toward the uterus.',
        '3. Fertilization: If sperms are present in the fallopian tube within 24 hours of ovulation, a single sperm penetrates the ovum to form a diploid zygote (2n).',
        '4. Cleavage & Implantation: The zygote undergoes mitotic divisions forming a blastocyst while travelling down the fallopian tube. On day 7, it implants into the thick, blood-rich endometrium of the uterus.',
        '5. Menstruation: If fertilization does not occur, the corpus luteum degenerates, progesterone levels crash, and the endometrial lining breaks down, discharging blood and tissue for 4–5 days.'
      ],
      drawingGuidelines: [
        'Draw a symmetrical inverted triangular/pear-shaped uterus in the center.',
        'Extend two curving fallopian tubes to the left and right like outstretched arms.',
        'Draw funnel-shaped infundibulum with finger-like fimbriae grasping near the ovaries.',
        'Draw an almond-shaped ovary on each side attached by ovarian ligaments.',
        'Draw the thick muscular wall (myometrium) and inner wavy mucosal lining (endometrium).',
        'Draw the lower neck (cervix) leading into the vertical tubular vagina.',
        'Label all 6 parts neatly on the right side using horizontal guidelines.'
      ],
      examQuestionsAsked: [
        'Draw a neat labeled diagram of human female reproductive system. (4 Marks)',
        'Where does fertilization take place in human females? (1 Mark)',
        'Explain the structure and functions of placenta. (2 Marks)'
      ],
      goldenNote: 'Always remember: Fertilization takes place in the Fallopian Tube (Oviduct), whereas Implantation and Gestation take place in the Uterus!'
    },
    {
      id: 'lp2-diag-3',
      title: 'Diagram 3: Double Fertilization in Angiospermic Flower',
      marks: 4,
      boardReference: 'SSC Board July 2023 / Page 32',
      difficulty: 'Board Mandatory',
      caption: 'Double fertilization process in angiosperms: Pollen tube germination, entry through micropyle, Syngamy (Zygote 2n) and Triple Fusion (Endosperm 3n).',
      diagramCategory: 'Physiological Process',
      svgType: 'double-fertilization',
      labels: [
        {
          id: 'lbl-df-pollen-grain',
          label: 'Germinating Pollen Grain on Stigma',
          positionDescription: 'Top landing platform',
          roleOrFunction: 'Pollen grain absorbs sugary stigmatic exudate, germinates, and produces a pollen tube containing 2 male gametes.',
          boardKeyPoint: 'Exine and Intine wall layers.'
        },
        {
          id: 'lbl-df-pollen-tube',
          label: 'Pollen Tube with 2 Non-Motile Male Gametes',
          positionDescription: 'Elongated tube growing down style towards ovary',
          roleOrFunction: 'Transports the two male gametes chemotropically down through style tissue to the embryo sac.',
          boardKeyPoint: 'Growth guided by calcium-boron chemical signals (Chemotropism).'
        },
        {
          id: 'lbl-df-embryo-sac',
          label: 'Female Gametophyte (Embryo Sac)',
          positionDescription: '7-celled, 8-nucleate structure inside ovule',
          roleOrFunction: 'Contains 3 Antipodals at chalazal end, 2 Polar Nuclei at center, and 1 Egg cell flanked by 2 Synergids at micropylar end.',
          boardKeyPoint: '7-celled, 8-nucleate organization.'
        },
        {
          id: 'lbl-df-syngamy',
          label: 'First Fertilization (Syngamy ➔ Zygote 2n)',
          positionDescription: 'Fusion with egg cell at micropyle',
          roleOrFunction: 'First male gamete (n) fuses with haploid egg cell (n) to form diploid Zygote (2n), which develops into the future embryo.',
          boardKeyPoint: 'n + n = 2n (Zygote).'
        },
        {
          id: 'lbl-df-triple-fusion',
          label: 'Second Fertilization (Triple Fusion ➔ Endosperm 3n)',
          positionDescription: 'Fusion at center of embryo sac',
          roleOrFunction: 'Second male gamete (n) fuses with diploid secondary nucleus / 2 polar nuclei (2n) to form Triploid Primary Endosperm Nucleus (PEN, 3n).',
          boardKeyPoint: 'n + 2n = 3n (Triploid Endosperm provides nourishment to growing embryo).'
        }
      ],
      stepByStepExplanation: [
        '1. Pollination & Germination: Pollen lands on sticky stigma. Intine emerges through germ pore to form a pollen tube.',
        '2. Tube Growth: The pollen tube grows down through the style into the ovary, carrying the tube nucleus and two haploid male gametes.',
        '3. Entry into Ovule: The pollen tube enters the ovule through the micropylar opening and discharges both male gametes into one synergid.',
        '4. Syngamy: 1st Male gamete (n) + Egg cell (n) ⟶ Diploid Zygote (2n) ➔ develops into plant embryo.',
        '5. Triple Fusion: 2nd Male gamete (n) + 2 Polar nuclei (2n) ⟶ Triploid Endosperm (3n) ➔ develops into nutritious endosperm tissue.',
        '6. Why called Double Fertilization? Because fertilization takes place TWICE in the same embryo sac (Syngamy + Triple Fusion), this unique angiosperm phenomenon is called Double Fertilization!'
      ],
      drawingGuidelines: [
        'Draw the carpel outline: Stigma at top, cylindrical Style in middle, swollen Ovary at base.',
        'Draw the anatropous ovule inside the ovary with double integuments leaving a micropyle pore at bottom.',
        'Draw the oval embryo sac with 3 antipodal cells at top, 2 central polar nuclei, and egg apparatus (1 egg + 2 synergids) at micropyle.',
        'Trace the dark pollen tube entering through the micropyle and releasing two circular male gametes.',
        'Label: Stigma, Style, Ovary, Pollen Tube, Male Gametes, Egg Cell, Polar Nuclei, Antipodal Cells, Micropyle.'
      ],
      examQuestionsAsked: [
        'Explain double fertilization in angiosperms with a neat diagram. (4 Marks)',
        'What is Triple Fusion? What is its ploidy? (2 Marks)',
        'State the fate of zygote and ovule after fertilization. (2 Marks)'
      ],
      goldenNote: 'Post-fertilization transformations: Ovule develops into Seed; Ovary ripens into Fruit; Zygote develops into Embryo; Endosperm provides Food!'
    }
  ],

  'Environmental Management': [
    {
      id: 'env-diag-1',
      title: 'Diagram 1: Energy Pyramid and Trophic Levels in an Ecosystem',
      marks: 3,
      boardReference: 'SSC Board July 2022 / Page 37',
      difficulty: 'High Frequency',
      caption: 'Upright ecological pyramid of energy demonstrating Lindeman\'s 10% law: Unidirectional energy flow with 90% metabolic dissipation at each trophic transition.',
      diagramCategory: 'Flowchart / Cycle',
      svgType: 'energy-pyramid',
      labels: [
        {
          id: 'lbl-ep-producers',
          label: 'Trophic Level 1: Producers (Phytoplankton / Green Plants)',
          positionDescription: 'Broadest bottom base of pyramid (10,000 kcal)',
          roleOrFunction: 'Autotrophs trapping solar energy via photosynthesis to create organic biomass.',
          boardKeyPoint: 'Maximum energy content (10,000 kcal).'
        },
        {
          id: 'lbl-ep-primary',
          label: 'Trophic Level 2: Primary Consumers (Herbivores / Zooplankton)',
          positionDescription: 'Second tier (1,000 kcal)',
          roleOrFunction: 'Directly consume producers (e.g. deer, grasshopper, cattle).',
          boardKeyPoint: 'Receives 10% of producer energy (1,000 kcal).'
        },
        {
          id: 'lbl-ep-secondary',
          label: 'Trophic Level 3: Secondary Consumers (Carnivores)',
          positionDescription: 'Third tier (100 kcal)',
          roleOrFunction: 'Feed on herbivores (e.g. frogs, small fish, birds).',
          boardKeyPoint: 'Receives 10% of herbivore energy (100 kcal).'
        },
        {
          id: 'lbl-ep-apex',
          label: 'Trophic Level 4: Apex / Tertiary Predators (Lion, Tiger, Eagle)',
          positionDescription: 'Narrow topmost tip (10 kcal)',
          roleOrFunction: 'Top carnivores with no natural predators.',
          boardKeyPoint: 'Lowest energy availability (10 kcal); Energy flow is strictly UNIDIRECTIONAL.'
        }
      ],
      stepByStepExplanation: [
        '1. Upright Pyramid of Energy: The energy pyramid is ALWAYS upright in every ecosystem because energy is lost as metabolic heat at every successive trophic step.',
        '2. Lindeman\'s 10% Ecological Efficiency Law: On average, only 10% of the energy stored as biomass in one trophic level is transferred to the next trophic level.',
        '3. 90% Energy Loss: 90% of ingested energy is utilized for organism respiration, movement, homeostasis, and dissipated into the surrounding atmosphere as heat.',
        '4. Limit on Food Chain Length: Because energy decreases exponentially (10,000 ➔ 1,000 ➔ 100 ➔ 10 kcal), food chains rarely exceed 4 to 5 trophic links before running out of usable energy.'
      ],
      drawingGuidelines: [
        'Draw a large symmetrical triangle divided into 4 horizontal stacked tiers.',
        'Label bottom tier: Producers (10,000 kcal) with grass/sun icons.',
        'Label second tier: Herbivores (1,000 kcal).',
        'Label third tier: Carnivores (100 kcal).',
        'Label tip tier: Apex Predators (10 kcal).',
        'Draw arrows on the sides pointing outward labeled "Heat lost to environment (90%)".',
        'Draw a vertical arrow labeled "Energy Flow is strictly Unidirectional".'
      ],
      examQuestionsAsked: [
        'Draw a neat labeled diagram of Energy Pyramid. (3 Marks)',
        'Why is the pyramid of energy always upright? (2 Marks)',
        'State Lindeman\'s 10% law of energy transfer. (2 Marks)'
      ],
      goldenNote: 'Distinction: Energy flow in an ecosystem is UNIDIRECTIONAL and NON-CYCLIC, whereas nutrient flow (carbon, nitrogen, phosphorus) is strictly CYCLIC!'
    }
  ],

  'Towards Green Energy': [
    {
      id: 'green-diag-1',
      title: 'Diagram 1: Thermal Power Plant Schematic & Energy Transformation Flowchart',
      marks: 4,
      boardReference: 'SSC Board March 2024 / Page 48',
      difficulty: 'Board Mandatory',
      caption: 'Schematic layout of coal-fired thermal power station displaying boiler, steam turbine, generator, condenser, and cooling tower loop.',
      diagramCategory: 'Schematic / Apparatus',
      svgType: 'thermal-power-plant',
      labels: [
        {
          id: 'lbl-tpp-boiler',
          label: 'Boiler / Combustion Chamber',
          positionDescription: 'Furnace where pulverized coal is burned',
          roleOrFunction: 'Burns coal to heat water into superheated high-pressure steam.',
          boardKeyPoint: 'Chemical energy of coal ➔ Thermal energy.'
        },
        {
          id: 'lbl-tpp-turbine',
          label: 'Steam Turbine',
          positionDescription: 'Rotary blades mounted on central shaft',
          roleOrFunction: 'High-pressure steam jets expand against curved turbine blades, rotating shaft at high RPM.',
          boardKeyPoint: 'Thermal energy ➔ Kinetic energy of turbine.'
        },
        {
          id: 'lbl-tpp-generator',
          label: 'Electric Generator',
          positionDescription: 'Armature coil rotating in magnetic field',
          roleOrFunction: 'Converts mechanical kinetic energy into electrical energy by electromagnetic induction.',
          boardKeyPoint: 'Kinetic energy ➔ Electrical energy.'
        },
        {
          id: 'lbl-tpp-condenser',
          label: 'Condenser & Cooling Tower Loop',
          positionDescription: 'Heat exchanger beneath turbine',
          roleOrFunction: 'Cools exhaust steam back into liquid water and recycles it to boiler, while excess heat is released through the cooling tower.',
          boardKeyPoint: 'Closed water recirculation loop reduces freshwater consumption.'
        }
      ],
      stepByStepExplanation: [
        '1. Step 1: Chemical energy stored in coal is released as thermal energy by combustion in the boiler.',
        '2. Step 2: The thermal energy boils feed-water into high-temperature, high-pressure steam.',
        '3. Step 3: High-pressure steam strikes the turbine blades, converting thermal energy into rotational kinetic energy.',
        '4. Step 4: The turbine drives the rotor of the electric generator, generating alternating current (AC) electricity by Faraday\'s electromagnetic induction.',
        '5. Step 5: Exhaust steam is condensed back to water in the condenser using cold water from the cooling tower and pumped back to the boiler.',
        '6. Energy Transformation Summary: Chemical Energy in Coal ⟶ Thermal Energy ⟶ Kinetic Energy of Steam ⟶ Kinetic Energy of Turbine ⟶ Electrical Energy!'
      ],
      drawingGuidelines: [
        'Draw a block diagram or physical schematic.',
        'Left: Boiler with coal feeder at bottom and tall flue gas chimney stack at top.',
        'Center: Steam pipe leading to rotary Turbine encased in housing.',
        'Right: Turbine shaft coupled to cylindrical Electric Generator with output power lines.',
        'Bottom: Condenser beneath turbine connected by two pipes to a hyperbolic Cooling Tower.',
        'Add the 5-box Energy Transformation Flowchart at the bottom.'
      ],
      examQuestionsAsked: [
        'Draw a neat schematic of a thermal power plant. (3/4 Marks)',
        'Draw a flowchart showing energy transformation in thermal power plant. (2 Marks)',
        'What are the environmental problems associated with thermal power generation? (3 Marks)'
      ],
      goldenNote: 'Environmental Hazards of Coal: Emission of toxic gases (CO₂, SO₂, NO₂), fly ash particulates causing respiratory disease, and global warming greenhouse effect.'
    },
    {
      id: 'green-diag-2',
      title: 'Diagram 2: Nuclear Power Plant Schematic & Controlled Fission Reactor',
      marks: 4,
      boardReference: 'SSC Board July 2023 / Page 50',
      difficulty: 'Board Mandatory',
      caption: 'Schematic layout of nuclear fission power plant displaying reactor core with Uranium-235 rods, control rods, coolant loop, steam generator, turbine, and concrete containment dome.',
      diagramCategory: 'Schematic / Apparatus',
      svgType: 'nuclear-power-plant',
      labels: [
        {
          id: 'lbl-npp-reactor',
          label: 'Nuclear Reactor Core (U-235 / Pu-239)',
          positionDescription: 'Central thick-walled pressure vessel',
          roleOrFunction: 'Sustains a controlled nuclear chain reaction where slow thermal neutrons split Uranium-235 nuclei, releasing tremendous nuclear binding energy.',
          boardKeyPoint: 'Nuclear energy ➔ Thermal energy.'
        },
        {
          id: 'lbl-npp-control-rods',
          label: 'Control Rods (Boron / Cadmium)',
          positionDescription: 'Rods inserted into reactor fuel core',
          roleOrFunction: 'Absorb excess neutrons to regulate or stop the nuclear chain reaction rate.',
          boardKeyPoint: 'Pushed in to slow down reaction; pulled out to increase power.'
        },
        {
          id: 'lbl-npp-moderator',
          label: 'Moderator (Heavy Water D₂O / Graphite)',
          positionDescription: 'Surrounds fuel rods in core',
          roleOrFunction: 'Slows down high-velocity fast fission neutrons into slow thermal neutrons capable of inducing further U-235 fission.',
          boardKeyPoint: 'Essential for sustaining chain reaction.'
        },
        {
          id: 'lbl-npp-heat-exchanger',
          label: 'Steam Generator / Heat Exchanger',
          positionDescription: 'Secondary water vessel outside core',
          roleOrFunction: 'Primary radioactive coolant transfers heat to non-radioactive secondary water, converting it into high pressure steam.',
          boardKeyPoint: 'Isolates radioactive water from turbine.'
        },
        {
          id: 'lbl-npp-containment',
          label: 'Radiation Shielding & Containment Dome',
          positionDescription: 'Thick reinforced concrete dome (1.5–2m thick)',
          roleOrFunction: 'Prevents harmful gamma and neutron radiation from escaping into the environment during operation or accidental meltdown.',
          boardKeyPoint: 'Built to withstand earthquakes and jet crashes.'
        }
      ],
      stepByStepExplanation: [
        '1. Step 1: Slow thermal neutrons hit Uranium-235 nuclei, initiating nuclear fission: U-235 + n ⟶ Ba-141 + Kr-92 + 3 neutrons + 200 MeV Energy.',
        '2. Step 2: The 3 released neutrons are slowed down by the moderator (D₂O) and regulated by Boron control rods to maintain a controlled chain reaction.',
        '3. Step 3: Massive nuclear thermal energy heats the primary pressurized coolant (~300°C).',
        '4. Step 4: In the steam generator, primary coolant boils secondary water into steam.',
        '5. Step 5: High-pressure steam drives the turbine connected to the electric generator, producing clean base-load electricity.',
        '6. Energy Transformation Flow: Nuclear Energy ⟶ Thermal Energy ⟶ Kinetic Energy of Steam ⟶ Kinetic Energy of Turbine ⟶ Electrical Energy!'
      ],
      drawingGuidelines: [
        'Draw a massive domed concrete containment structure on the left.',
        'Inside dome: Draw reactor pressure vessel containing fuel rods (hatched) and control rods (solid black).',
        'Draw primary closed coolant loop circulating through heat exchanger vessel.',
        'Draw secondary loop taking steam to turbine and returning water from condenser.',
        'Show turbine coupled to generator.',
        'Label: Nuclear Reactor, Control Rods, Moderator, Heat Exchanger, Turbine, Generator, Concrete Shielding.'
      ],
      examQuestionsAsked: [
        'Draw a neat labeled diagram of nuclear power plant. (4 Marks)',
        'State the function of control rods and moderator in nuclear reactor. (2 Marks)',
        'What are the major challenges in nuclear power generation? (Disposal of radioactive waste, risk of accidents like Chernobyl/Fukushima).'
      ],
      goldenNote: '1 gram of Uranium-235 produces as much energy as burning approximately 3 tons of high-grade coal!'
    },
    {
      id: 'green-diag-3',
      title: 'Diagram 3: Hydroelectric Power Plant Schematic',
      marks: 3,
      boardReference: 'SSC Board March 2023 / Page 53',
      difficulty: 'High Frequency',
      caption: 'Schematic cross-section of hydroelectric power dam showing water reservoir, sluice gate, penstock pipe, hydraulic turbine, generator, and tailrace.',
      diagramCategory: 'Schematic / Apparatus',
      svgType: 'hydroelectric-power',
      labels: [
        {
          id: 'lbl-hep-reservoir',
          label: 'Water Reservoir behind High Dam',
          positionDescription: 'Deep artificial lake at elevated height',
          roleOrFunction: 'Stores massive volume of water at high elevation, storing immense gravitational potential energy (m·g·h).',
          boardKeyPoint: 'Potential energy of stored water.'
        },
        {
          id: 'lbl-hep-penstock',
          label: 'Penstock (Pressure Conduit Pipe)',
          positionDescription: 'Large steep downward steel pipe',
          roleOrFunction: 'Channels water from reservoir down to turbine; converts gravitational potential energy into high-velocity kinetic energy.',
          boardKeyPoint: 'Potential energy ➔ Kinetic energy.'
        },
        {
          id: 'lbl-hep-turbine',
          label: 'Hydraulic Water Turbine (Francis / Pelton)',
          positionDescription: 'Submerged turbine at bottom of dam',
          roleOrFunction: 'High-speed water jet strikes runner blades, rotating turbine shaft.',
          boardKeyPoint: 'Kinetic energy of water ➔ Kinetic energy of turbine.'
        },
        {
          id: 'lbl-hep-generator',
          label: 'Electric Generator',
          positionDescription: 'Housed in powerhouse above turbine',
          roleOrFunction: 'Converts rotational kinetic energy into electrical power without burning any fuel.',
          boardKeyPoint: 'Zero direct greenhouse gas emissions.'
        },
        {
          id: 'lbl-hep-tailrace',
          label: 'Tailrace Channel',
          positionDescription: 'Discharge canal leaving powerhouse',
          roleOrFunction: 'Returns spent water safely to natural river downstream for agricultural irrigation.',
          boardKeyPoint: 'Water is not consumed, only energy is extracted.'
        }
      ],
      stepByStepExplanation: [
        '1. Step 1: Water stored at high elevation behind a massive concrete dam possesses high Potential Energy (P.E. = mgh).',
        '2. Step 2: Sluice gates open, and water rushes down through the inclined penstock pipe, converting P.E. into Kinetic Energy (K.E. = 1/2 mv²).',
        '3. Step 3: High-pressure water strikes the turbine runner blades, spinning the shaft at high velocity.',
        '4. Step 4: The spinning turbine drives the generator rotor inside magnetic stators, generating electrical voltage.',
        '5. Energy Flow: Potential Energy of Water ⟶ Kinetic Energy of Flowing Water ⟶ Kinetic Energy of Turbine ⟶ Electrical Energy!'
      ],
      drawingGuidelines: [
        'Draw a high triangular dam wall retaining a deep blue water reservoir on the left.',
        'Draw an inclined penstock pipe starting from intake gate down to the powerhouse base.',
        'Draw the turbine wheel inside the powerhouse with vertical shaft connected to generator.',
        'Draw tailrace water channel exiting to the right.',
        'Label: Dam, Reservoir, Control Gate, Penstock, Turbine, Powerhouse, Generator, Tailrace.'
      ],
      examQuestionsAsked: [
        'Sketch and label a Hydroelectric Power Plant. (3 Marks)',
        'Trace the sequence of energy transformations in a hydroelectric power station. (2 Marks)',
        'State two merits and two environmental concerns of building large dams. (2 Marks)'
      ],
      goldenNote: 'Merits: Clean renewable energy, no fuel cost, flood control, irrigation. Concerns: Inundation of forests, displacement of indigenous human populations, threat to aquatic biodiversity.'
    }
  ],

  'Animal Classification': [
    {
      id: 'animal-diag-1',
      title: 'Diagram 1: Criteria for Modern System of Animal Classification',
      marks: 3,
      boardReference: 'SSC Board March 2024 / Page 62–64',
      difficulty: 'High Frequency',
      caption: 'Hierarchical criteria flowchart: Body Organization, Body Symmetry, Germ Layers, Body Cavity (Coelom), and Segmentation.',
      diagramCategory: 'Flowchart / Cycle',
      svgType: 'animal-criteria',
      labels: [
        {
          id: 'lbl-ac-org',
          label: '1. Levels of Body Organization',
          positionDescription: 'First classification branch',
          roleOrFunction: 'Cellular grade (Porifera) ➔ Tissue grade (Cnidaria) ➔ Organ grade (Platyhelminthes) ➔ Organ-System grade (Annelida, Arthropoda, Chordata).',
          boardKeyPoint: 'Shows evolutionary progression from single cells to complex organ systems.'
        },
        {
          id: 'lbl-ac-sym',
          label: '2. Body Symmetry',
          positionDescription: 'Second classification branch',
          roleOrFunction: '• Asymmetrical: No plane divides body into equal halves (Sponges / Porifera).\n• Radial Symmetry: Any plane passing through central axis divides into equal halves (Starfish, Hydra).\n• Bilateral Symmetry: ONLY ONE vertical plane gives identical left and right halves (Insects, Fish, Humans).',
          boardKeyPoint: 'Bilateral symmetry is associated with cephalization (head formation).'
        },
        {
          id: 'lbl-ac-germ',
          label: '3. Germ Layers (Embryonic Layers)',
          positionDescription: 'Third classification branch',
          roleOrFunction: '• Diploblastic: Two layers — Ectoderm & Endoderm (Cnidaria).\n• Triploblastic: Three layers — Ectoderm, Mesoderm, & Endoderm (Platyhelminthes to Chordates).',
          boardKeyPoint: 'Mesoderm gives rise to muscles, skeleton, and circulatory system.'
        },
        {
          id: 'lbl-ac-coelom',
          label: '4. Body Cavity (Coelom)',
          positionDescription: 'Fourth classification branch',
          roleOrFunction: '• Acoelomate: No body cavity; solid mesenchyme (Porifera, Cnidaria, Platyhelminthes).\n• Pseudocoelomate: False body cavity not lined by mesoderm (Aschelminthes / Roundworms).\n• Eucoelomate: True coelom completely lined by mesoderm on both sides (Annelida to Chordata).',
          boardKeyPoint: 'True coelom cushions internal organs and allows gut peristalsis.'
        }
      ],
      stepByStepExplanation: [
        'Kingdom Animalia (Multicellular, heterotrophic eukaryotes without cell wall):',
        '1. If Cellular level of organization ➔ Phylum Porifera (Sponges).',
        '2. If Tissue/Organ/Organ system level:',
        '   A. Radial symmetry, Diploblastic, Acoelomate ➔ Phylum Cnidaria (Coelenterata).',
        '   B. Bilateral symmetry, Triploblastic:',
        '      i. Without coelom (Acoelomate) ➔ Phylum Platyhelminthes (Flatworms).',
        '      ii. With false coelom (Pseudocoelomate) ➔ Phylum Aschelminthes (Roundworms).',
        '      iii. With true coelom (Eucoelomate):',
        '          • Non-chordates: Annelida, Arthropoda, Mollusca, Echinodermata, Hemichordata.',
        '          • Chordates: Phylum Chordata (Vertebrates).'
      ],
      drawingGuidelines: [
        'Draw a clean branching tree diagram.',
        'Top node: Kingdom Animalia.',
        'Branch by Grade of Organization ➔ Symmetry ➔ Germ Layers ➔ Coelom.',
        'Color code: Acoelomate (red), Pseudocoelomate (yellow), Eucoelomate (green).',
        'List 1 example organism under each final phylum.'
      ],
      examQuestionsAsked: [
        'State the criteria used for modern classification of animals. (3 Marks)',
        'Differentiate between Diploblastic and Triploblastic animals. (2 Marks)',
        'What is a true coelom? Name one pseudocoelomate animal. (Ascaris). (2 Marks)'
      ],
      goldenNote: 'Aschelminthes (Roundworm / Ascaris) is the ONLY pseudocoelomate phylum in the animal kingdom! This is tested in 90% of Board Objective sections.'
    }
  ],

  'Introduction to Microbiology': [
    {
      id: 'micro-diag-1',
      title: 'Diagram 1: Industrial Bioreactor / Fermenter Schematic',
      marks: 3,
      boardReference: 'SSC Board July 2022 / Page 78',
      difficulty: 'High Frequency',
      caption: 'Schematic cross-section of industrial stainless-steel fermentation vessel showing agitator motor, impeller blades, sterile sparger, cooling water jacket, sensors, and harvest port.',
      diagramCategory: 'Schematic / Apparatus',
      svgType: 'bioreactor-fermenter',
      labels: [
        {
          id: 'lbl-br-motor',
          label: 'Electric Motor & Agitator Shaft',
          positionDescription: 'Mounted on top dome',
          roleOrFunction: 'Drives the impeller shaft at controlled speed to ensure homogenous mixing of nutrients, microbes, and oxygen.',
          boardKeyPoint: 'Prevents microbial settling at bottom.'
        },
        {
          id: 'lbl-br-impeller',
          label: 'Impeller Blades (Flat Blade / Rushton Turbine)',
          positionDescription: 'Blades along central rotating shaft',
          roleOrFunction: 'Breaks large air bubbles into micro-bubbles, maximizing oxygen transfer area to aerobic microbes.',
          boardKeyPoint: 'Uniform nutrient distribution.'
        },
        {
          id: 'lbl-br-sparger',
          label: 'Air Sparger (Sterile Aeration Pipe)',
          positionDescription: 'Perforated pipe ring at bottom of tank',
          roleOrFunction: 'Injects pressurized sterile air or pure oxygen into culture broth for aerobic microbial respiration.',
          boardKeyPoint: 'Air must be passed through 0.22 μm sterile filters to prevent contamination.'
        },
        {
          id: 'lbl-br-jacket',
          label: 'Cooling Water Jacket',
          positionDescription: 'Double outer wall surrounding vessel',
          roleOrFunction: 'Circulates cold water to absorb immense metabolic heat generated by rapidly multiplying microbes, maintaining optimal temperature (30–37°C).',
          boardKeyPoint: 'Prevents thermal denaturation of microbial enzymes.'
        },
        {
          id: 'lbl-br-sensors',
          label: 'pH and Temperature Probes',
          positionDescription: 'Sensors penetrating vessel sidewall',
          roleOrFunction: 'Provides real-time feedback to automated dosing pumps for acid/alkali addition and temperature control.',
          boardKeyPoint: 'Maintains optimal pH for maximum antibiotic / enzyme yield.'
        }
      ],
      stepByStepExplanation: [
        '1. Inoculation: The stainless steel fermenter is steam-sterilized (SIP: Sterilization-in-Place). Sterile nutrient broth and high-yielding microbial starter culture are loaded.',
        '2. Aeration & Mixing: Sterile air is pumped through the bottom sparger while motorized impeller blades disperse bubbles throughout the broth.',
        '3. Parameter Control: Real-time computer sensors monitor temperature, dissolved oxygen, and pH, automatically adjusting coolant flow and neutralizing chemicals.',
        '4. Metabolite Production: Microbes proliferate exponentially, synthesizing desired commercial products (Penicillin antibiotic, Citric acid, Ethanol, Lactic acid, Yogurt cultures).',
        '5. Downstream Processing: The fermented broth is harvested through bottom outlet valve, followed by filtration, centrifugal separation, and chemical crystallization.'
      ],
      drawingGuidelines: [
        'Draw a cylindrical vessel with rounded hemispherical top and bottom heads.',
        'Draw a double outer wall representing the cooling jacket with cold water inlet at bottom and warm water outlet at top.',
        'Draw top motor connected to central shaft with 2–3 sets of impeller blades.',
        'Draw bottom perforated sparger pipe.',
        'Draw sidewall temperature and pH probes.',
        'Label: Motor, Impeller, Baffle, Air Sparger, Cooling Jacket, Harvest Valve, Nutrient Inlet.'
      ],
      examQuestionsAsked: [
        'Sketch and label an industrial fermenter. (3 Marks)',
        'State the role of: 1) Cooling jacket, 2) Sparger in a bioreactor. (2 Marks)',
        'Name two microbes used in dairy fermentation. (Lactobacillus bulgaricus, Streptococcus thermophilus).'
      ],
      goldenNote: 'Industrial products: Antibiotics (Penicillium), Cheese (Lactobacillus), Vinegar (Acetobacter aceti), Xanthan gum (Xanthomonas campestris).'
    }
  ],

  'Cell Biology and Biotechnology': [
    {
      id: 'biotech-diag-1',
      title: 'Diagram 1: Stem Cell Therapy & Pluripotency Differentiation Pathways',
      marks: 3,
      boardReference: 'SSC Board March 2024 / Page 89',
      difficulty: 'High Frequency',
      caption: 'Stem cell hierarchy from blastocyst inner cell mass (embryonic stem cells) into multipotent specialized lineages: neurons, hepatocytes, myocytes, and blood cells.',
      diagramCategory: 'Flowchart / Cycle',
      svgType: 'stem-cell-pathway',
      labels: [
        {
          id: 'lbl-sc-blastocyst',
          label: 'Early Embryonic Blastocyst (Day 5–7)',
          positionDescription: 'Hollow sphere of cells',
          roleOrFunction: 'Contains Inner Cell Mass (ICM) consisting of ~100–150 undifferentiated cells with unlimited developmental potential.',
          boardKeyPoint: 'Embryonic stem cells are Pluripotent.'
        },
        {
          id: 'lbl-sc-pluripotent',
          label: 'Pluripotent Stem Cells',
          positionDescription: 'Central branching hub',
          roleOrFunction: 'Can self-renew indefinitely and retain the genetic ability to differentiate into virtually all ~220 cell types of the human adult body.',
          boardKeyPoint: 'Definition: "Undifferentiated biological cells that can differentiate into specialized cells and divide through mitosis to produce more stem cells".'
        },
        {
          id: 'lbl-sc-neuron',
          label: 'Neurons (Nerve Cells)',
          positionDescription: 'Top right differentiation branch',
          roleOrFunction: 'Used in regenerative therapy to treat neurodegenerative diseases: Parkinson\'s disease, Alzheimer\'s, and spinal cord injuries.',
          boardKeyPoint: 'Regenerates non-dividing nerve tissue.'
        },
        {
          id: 'lbl-sc-blood',
          label: 'Hematopoietic Stem Cells (Blood Cells)',
          positionDescription: 'Middle right differentiation branch',
          roleOrFunction: 'Differentiates into Erythrocytes (RBCs), Leukocytes (WBCs), and Platelets; used in bone marrow transplantation for Leukemia / Thalassemia.',
          boardKeyPoint: 'Bone marrow and umbilical cord blood are rich sources.'
        },
        {
          id: 'lbl-sc-pancreas',
          label: 'Pancreatic Beta Cells',
          positionDescription: 'Bottom right differentiation branch',
          roleOrFunction: 'Produces human insulin; transplanted into Type 1 Diabetes patients to restore normal glucose homeostasis.',
          boardKeyPoint: 'Cures insulin-dependent diabetes.'
        }
      ],
      stepByStepExplanation: [
        '1. Sources of Stem Cells: Embryonic stem cells (isolated from 5–7 day blastocyst before implantation) and Adult stem cells (found in red bone marrow, adipose fat tissue, and umbilical cord blood).',
        '2. Pluripotency: Under specific biochemical and hormonal signaling in culture dishes, stem cells can be directed to transform into any desired functional tissue.',
        '3. Therapeutic Applications:',
        '   • Cell Replacement Therapy: Healing dead heart muscle after myocardial infarction, repairing paralyzed spinal cord neurons, regenerating lost dopamine neurons in Parkinson\'s disease.',
        '   • Organ Cloning / Bio-artificial Organs: Growing replacement kidneys, livers, and corneas in vitro, eliminating organ donor shortages and immunological rejection.',
        '   • Stem Cell Preservation: Storing umbilical cord blood in stem cell banks at -196°C in liquid nitrogen for lifetime medical insurance.'
      ],
      drawingGuidelines: [
        'Draw a circular blastocyst with inner cell mass at top left.',
        'Draw arrows converging into a central glowing cell labeled "Pluripotent Stem Cell".',
        'Draw 4 radiating branches leading to different specialized cells:',
        '  - Branch 1: Branched Neuron (Nerve cell with axon and dendrites).',
        '  - Branch 2: Biconcave Red Blood Cell (RBC).',
        '  - Branch 3: Striated Heart Muscle Cell (Cardiomyocyte).',
        '  - Branch 4: Pancreatic Beta Islet cell releasing insulin.',
        'Label: Blastocyst, Stem Cell, Neuron, Blood Cell, Heart Muscle, Liver Cell.'
      ],
      examQuestionsAsked: [
        'What are stem cells? State two sources and two therapeutic uses of stem cells. (3 Marks)',
        'Draw a schematic flowchart showing differentiation of stem cells. (3 Marks)',
        'What is stem cell preservation? (1 Mark)'
      ],
      goldenNote: 'Differentiate between Pluripotent (can form almost all tissues, e.g. embryonic stem cells) and Multipotent (can form limited related cell types, e.g. bone marrow adult stem cells).'
    },
    {
      id: 'biotech-diag-2',
      title: 'Diagram 2: Recombinant DNA Technology (Genetic Engineering Flowchart)',
      marks: 4,
      boardReference: 'SSC Board July 2023 / Page 92',
      difficulty: 'Board Mandatory',
      caption: 'Step-by-step recombinant DNA technology: Gene isolation, restriction enzyme digestion, DNA ligase splicing into plasmid vector, bacterial transformation, and commercial harvesting of human insulin.',
      diagramCategory: 'Flowchart / Cycle',
      svgType: 'recombinant-dna',
      labels: [
        {
          id: 'lbl-rdna-human',
          label: 'Human Cell with Insulin Gene',
          positionDescription: 'Top left donor source',
          roleOrFunction: 'Source of the target gene of interest (Human Pro-Insulin gene on Chromosome 11).',
          boardKeyPoint: 'Identified and isolated from donor genome.'
        },
        {
          id: 'lbl-rdna-vector',
          label: 'Bacterial Plasmid Vector (from E. coli)',
          positionDescription: 'Top right circular DNA ring',
          roleOrFunction: 'Small, circular, self-replicating extrachromosomal DNA molecule used as a molecular delivery vehicle.',
          boardKeyPoint: 'Plasmid carries origin of replication (ori).'
        },
        {
          id: 'lbl-rdna-enzyme-cut',
          label: 'Restriction Endonuclease (Molecular Scissors)',
          positionDescription: 'Scissors cutting DNA at specific palindromic sequences',
          roleOrFunction: 'Cuts both donor DNA and plasmid vector at identical specific nucleotide sequences, generating matching complementary sticky ends.',
          boardKeyPoint: 'Nicknamed "Molecular Scissors".'
        },
        {
          id: 'lbl-rdna-ligase',
          label: 'DNA Ligase (Molecular Glue)',
          positionDescription: 'Enzyme joining DNA segments',
          roleOrFunction: 'Forms covalent phosphodiester bonds between human gene sticky ends and cut plasmid vector, producing Recombinant Plasmid (Chimeric DNA).',
          boardKeyPoint: 'Nicknamed "Molecular Glue".'
        },
        {
          id: 'lbl-rdna-host',
          label: 'Transformation into Host Bacterium (E. coli)',
          positionDescription: 'Bacterium absorbing recombinant plasmid',
          roleOrFunction: 'Host bacterium takes up recombinant plasmid and divides every 20 minutes in a fermenter, producing millions of transgenic bacterial clones synthesizing pure human insulin (Humulin).',
          boardKeyPoint: 'Genetically Modified Organism (GMO).'
        }
      ],
      stepByStepExplanation: [
        '1. Step 1 (Gene Isolation): The human gene responsible for insulin production is located and isolated from human DNA.',
        '2. Step 2 (Vector Preparation): A circular plasmid is extracted from bacterium Escherichia coli (E. coli).',
        '3. Step 3 (Cutting by Restriction Enzyme): Both the human insulin gene and plasmid vector are cleaved using the SAME Restriction Endonuclease enzyme, producing matching single-stranded "sticky ends".',
        '4. Step 4 (Ligation): Enzyme DNA Ligase splices the human insulin gene into the open plasmid, creating a Recombinant DNA (rDNA) molecule.',
        '5. Step 5 (Transformation & Expression): The recombinant plasmid is reintroduced into host E. coli bacteria. The transformed transgenic bacteria multiply rapidly in industrial bioreactors, translating human insulin protein which is purified, packaged, and distributed to diabetic patients worldwide!'
      ],
      drawingGuidelines: [
        'Top Left: Draw human DNA strand with colored segment labeled "Human Insulin Gene".',
        'Top Right: Draw circular ring labeled "Bacterial Plasmid".',
        'Middle: Draw scissors icon cutting both, followed by glue icon (DNA Ligase) sealing gene into plasmid ring.',
        'Bottom: Draw rod-shaped E. coli bacterium containing the recombinant plasmid, followed by dividing daughter bacteria producing insulin crystals.',
        'Label: Restriction Endonuclease, DNA Ligase, Plasmid Vector, Recombinant DNA, Transgenic Bacterium, Human Insulin.'
      ],
      examQuestionsAsked: [
        'Explain the process of production of human insulin using biotechnology with a diagram. (4 Marks)',
        'What are molecular scissors and molecular glue? (2 Marks)',
        'State two benefits of biotechnology in agriculture (Bt Cotton, Golden Rice). (2 Marks)'
      ],
      goldenNote: 'Remember: Restriction enzymes cut DNA (Scissors), while DNA Ligase joins DNA (Glue). Humulin was the first genetically engineered medicine approved for human use!'
    }
  ],

  'Social Health': [
    {
      id: 'social-diag-1',
      title: 'Diagram 1: Interconnected Web of Factors Affecting Social Health',
      marks: 3,
      boardReference: 'SSC Board March 2023 / Page 102',
      difficulty: 'High Frequency',
      caption: 'Circular socio-environmental wheel depicting physical environment, mental stress, social relationship networks, financial security, and lifestyle addictions affecting overall community well-being.',
      diagramCategory: 'Flowchart / Cycle',
      svgType: 'social-health-web',
      labels: [
        {
          id: 'lbl-sh-mental',
          label: 'Mental Stress & Incurable Diseases',
          positionDescription: 'Top sector of circle',
          roleOrFunction: 'Academic competition, nuclear family isolation, chronic illness in family leads to clinical depression and mental fatigue.',
          boardKeyPoint: 'Laughter clubs, yoga, and meditation relieve mental tension.'
        },
        {
          id: 'lbl-sh-addiction',
          label: 'Addiction (Substance Abuse & Cyber Addiction)',
          positionDescription: 'Right sector of circle',
          roleOrFunction: 'Alcoholism, tobacco chewing (gutkha causing oral cancer), smoking, and digital screen addiction (gaming, selfie mania, social media obsession).',
          boardKeyPoint: 'Selfie deaths and gaming violence alter psychological behavior.'
        },
        {
          id: 'lbl-sh-environment',
          label: 'Physical & Social Environment',
          positionDescription: 'Bottom sector of circle',
          roleOrFunction: 'Clean drinking water, sanitation facilities, safe residential locality, garden playgrounds, and peaceful neighborhood relations.',
          boardKeyPoint: 'Basic civic amenities form foundation of social health.'
        },
        {
          id: 'lbl-sh-support',
          label: 'Social & Emotional Support Network',
          positionDescription: 'Left sector of circle',
          roleOrFunction: 'Healthy communication with parents, trust in teachers, positive peer group interactions, and counseling centers.',
          boardKeyPoint: 'Helpline numbers (1098 Childline, Cyber cell) provide crisis support.'
        }
      ],
      stepByStepExplanation: [
        '1. Definition: Social health is the ability of an individual to establish, nurture, and maintain healthy, harmonious interpersonal relationships with family, friends, and society.',
        '2. Detrimental Factors: Mental stress, addiction to substances (tobacco, alcohol, narcotics), and cyber crimes / digital gaming addiction severely deteriorate mental equilibrium.',
        '3. Remedial Measures:',
        '   • Physical: Outdoor games, regular sports, hobby cultivation (gardening, reading, music).',
        '   • Mental: Laughter therapy, pranayama meditation, open conversation with trusted family.',
        '   • Legal & Institutional: IT Act 2000 (Section 66 for cybercrimes), Salaam Bombay Foundation, de-addiction centers.'
      ],
      drawingGuidelines: [
        'Draw a central circle labeled "Social Health".',
        'Surround it with 6 interconnecting circular or petal nodes with double-headed arrows.',
        'Nodes: Financial Status, Mental Stress, Education, Clean Environment, Social Trust, Addiction.',
        'Draw positive coping mechanisms at the bottom: Sports, Music, Yoga, Counseling.'
      ],
      examQuestionsAsked: [
        'Which factors affect social health? Illustrate with a diagram. (3 Marks)',
        'What is cyber crime? State provisions under IT Act 2000. (2 Marks)',
        'Write short note on: Selfie mania and road safety. (2 Marks)'
      ],
      goldenNote: 'Remember: Health is not merely the absence of disease, but a state of complete physical, mental, and social well-being (WHO definition)!'
    }
  ],

  'Disaster Management': [
    {
      id: 'disaster-diag-1',
      title: 'Diagram 1: Complete Disaster Management Cycle (Pre-Disaster & Post-Disaster Phases)',
      marks: 4,
      boardReference: 'SSC Board March 2024 / Page 113',
      difficulty: 'Board Mandatory',
      caption: 'Continuous circular disaster resilience framework illustrating Pre-Disaster Mitigation, Preparedness & Early Warning, followed by Post-Disaster Emergency Response, Relief, Rehabilitation, and Reconstruction.',
      diagramCategory: 'Flowchart / Cycle',
      svgType: 'disaster-cycle',
      labels: [
        {
          id: 'lbl-dm-prep',
          label: '1. Disaster Preparedness & Planning',
          positionDescription: 'Top right circular quadrant',
          roleOrFunction: 'Formulating disaster response action plans, conducting school/community mock drills, and stocking emergency medical supplies.',
          boardKeyPoint: 'Pre-disaster proactive stage.'
        },
        {
          id: 'lbl-dm-mitigation',
          label: '2. Mitigation / Risk Reduction',
          positionDescription: 'Upper right quadrant',
          roleOrFunction: 'Structural engineering measures to minimize potential disaster damage (e.g. earthquake-resistant buildings, flood embankments, coastal mangrove protection).',
          boardKeyPoint: 'Long-term risk reduction.'
        },
        {
          id: 'lbl-dm-warning',
          label: '3. Early Warning & Evacuation',
          positionDescription: 'Middle right transition point',
          roleOrFunction: 'Meteorological Doppler radar storm warnings, tsunami alert buoys, siren broadcasts, and mass evacuation to storm shelters.',
          boardKeyPoint: 'Saves thousands of lives before disaster strikes.'
        },
        {
          id: 'lbl-dm-response',
          label: '4. Immediate Emergency Response & Search-Rescue',
          positionDescription: 'Bottom quadrant (Disaster strike)',
          roleOrFunction: 'Deploying NDRF (National Disaster Response Force), military helicopters, and sniffer dogs within the first "Golden 72 Hours" to rescue trapped survivors.',
          boardKeyPoint: 'First 72 hours are critical for survival.'
        },
        {
          id: 'lbl-dm-relief',
          label: '5. Relief & Temporary Shelter',
          positionDescription: 'Bottom left quadrant',
          roleOrFunction: 'Distributing clean drinking water, food packets, emergency medicines, prevention of epidemic outbreaks, and temporary relief camps.',
          boardKeyPoint: 'Immediate humanitarian assistance.'
        },
        {
          id: 'lbl-dm-rehab',
          label: '6. Rehabilitation & Psycho-Social Counseling',
          positionDescription: 'Middle left quadrant',
          roleOrFunction: 'Providing compensation, alternative livelihoods, emotional trauma counseling for orphans and survivors, and restoring basic utilities (power, roads).',
          boardKeyPoint: 'Restoring normal community life.'
        },
        {
          id: 'lbl-dm-reconstruct',
          label: '7. Reconstruction (Build Back Better)',
          positionDescription: 'Top left quadrant',
          roleOrFunction: 'Permanent reconstruction of houses, schools, bridges with higher safety standards so the community is more resilient against future disasters.',
          boardKeyPoint: 'Closes the cycle into enhanced preparedness.'
        }
      ],
      stepByStepExplanation: [
        'Phase 1: Pre-Disaster Phase (Prevention & Preparedness):',
        '  • Preparedness: Training personnel, conducting regular mock drills, mapping hazard zones.',
        '  • Mitigation: Constructing cyclone shelters, earthquake-safe buildings, maintaining drainage.',
        '  • Warning: Rapid dissemination of real-time early warnings via SMS, sirens, TV, radio.',
        'Phase 2: During Disaster (Emergency Rescue):',
        '  • Quick deployment of NDRF, fire brigade, local volunteers. Search and rescue operations during the golden hour.',
        'Phase 3: Post-Disaster Phase (Recovery & Reconstruction):',
        '  • Relief: Emergency food, sanitation to prevent cholera/typhoid, medical first aid.',
        '  • Rehabilitation: Financial grants, temporary housing, psychological counseling.',
        '  • Reconstruction: Rebuilding infrastructure with "Build Back Better" seismic resilience.'
      ],
      drawingGuidelines: [
        'Draw a large circular pathway with clockwise directional arrows connecting 6–7 stages.',
        'Split the circle horizontally: Upper half = Pre-Disaster Phase; Lower half = Post-Disaster Phase.',
        'Draw the flash icon at 6 o\'clock labeled "DISASTER STRIKE".',
        'Label each stage clearly in a rectangular rounded box with stage numbers 1 to 7.',
        'Color code: Pre-disaster (Green/Blue), Post-disaster (Red/Orange).'
      ],
      examQuestionsAsked: [
        'Draw a neat labeled diagram of Disaster Management Cycle. (4 Marks)',
        'Explain the role of mock drill in disaster management. (2 Marks)',
        'What is NDRF? When was it established? (National Disaster Response Force, Disaster Management Act 2005). (2 Marks)'
      ],
      goldenNote: 'First Aid ABC Rule: A = Airway (clear throat), B = Breathing (check chest rise / CPR), C = Circulation (check wrist/carotid pulse and stop severe arterial bleeding with pressure bandage)!'
    },
    {
      id: 'disaster-diag-2',
      title: 'Diagram 2: First Aid ABC Life Support & PASS Fire Extinguisher Protocol',
      marks: 3,
      boardReference: 'SSC Board Model Paper / Page 116',
      difficulty: 'High Frequency',
      caption: 'Standard life-saving first-aid protocol: Airway, Breathing, Circulation (CPR) triage alongside the universal P.A.S.S. fire extinguisher operating steps.',
      diagramCategory: 'Flowchart / Cycle',
      svgType: 'first-aid-pass',
      labels: [
        {
          id: 'lbl-fa-airway',
          label: 'A — Airway Clearance',
          positionDescription: 'Step 1: Head tilt, chin lift',
          roleOrFunction: 'Tilt the patient\'s head gently backward and lift chin forward to prevent tongue from obstructing the trachea.',
          boardKeyPoint: 'Ensure foreign objects / vomit are removed from oral cavity.'
        },
        {
          id: 'lbl-fa-breathing',
          label: 'B — Breathing Assessment & Ventilation',
          positionDescription: 'Step 2: Look, listen, and feel for breath',
          roleOrFunction: 'Check for chest rise for 10 seconds; if patient is not breathing, provide 2 rescue breaths (mouth-to-mouth resuscitation).',
          boardKeyPoint: 'Pinch nose shut while blowing air into mouth.'
        },
        {
          id: 'lbl-fa-circulation',
          label: 'C — Circulation & Chest Compressions (CPR)',
          positionDescription: 'Step 3: Interlocked hands on center of chest',
          roleOrFunction: 'Deliver 30 chest compressions at rate of 100–120 per minute at depth of 5 cm, followed by 2 breaths (30:2 ratio).',
          boardKeyPoint: 'Maintains blood and oxygen flow to brain.'
        },
        {
          id: 'lbl-pass-rule',
          label: 'Fire Extinguisher P.A.S.S. Rule',
          positionDescription: '4-step fire extinguisher sequence',
          roleOrFunction: '• P = Pull the safety pin.\n• A = Aim low at the BASE of the fire (not flames).\n• S = Squeeze the discharge handle.\n• S = Sweep nozzle from side to side across the fuel bed.',
          boardKeyPoint: 'Always aim at the BASE of the fire, never at top flames!'
        }
      ],
      stepByStepExplanation: [
        '1. First Aid Golden Hour: The first 60 minutes after severe traumatic injury where immediate medical treatment gives the highest likelihood of preventing death.',
        '2. ABC Protocol for Unconscious Victims:',
        '   • A (Airway): Check if air passage is open. Remove dentures, mud, or vomit.',
        '   • B (Breathing): Observe chest movement. If absent, start artificial respiration.',
        '   • C (Circulation): Check carotid pulse on neck. If absent, initiate Cardiopulmonary Resuscitation (CPR): 30 chest compressions followed by 2 rescue breaths.',
        '3. Fire Emergency P.A.S.S. Operating Protocol:',
        '   • Pull pin to break tamper seal.',
        '   • Aim nozzle at the burning fuel base.',
        '   • Squeeze trigger lever steadily.',
        '   • Sweep nozzle side to side covering the entire fire area until fully extinguished.'
      ],
      drawingGuidelines: [
        'Left Side: Draw 3 vertical boxes for A, B, C with human posture icons.',
        'Right Side: Draw a red fire extinguisher with 4 callout bubbles for P-A-S-S.',
        'Label: Airway (Head-tilt), Breathing (Rescue breath), Circulation (Chest compressions 30:2).',
        'P-A-S-S: Pull, Aim, Squeeze, Sweep.'
      ],
      examQuestionsAsked: [
        'Explain the ABC rule of first aid. (2 Marks)',
        'What does PASS stand for in operating a fire extinguisher? (2 Marks)',
        'How should a patient with third-degree burns or bleeding be treated before doctor arrives? (2 Marks)'
      ],
      goldenNote: 'In electric fires, NEVER use water! Use CO₂ or dry chemical powder (DCP) extinguishers. Disconnect main power switch immediately!'
    }
  ]
};
