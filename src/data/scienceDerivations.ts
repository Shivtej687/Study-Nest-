export interface HandwrittenDerivationStep {
  stepNumber: number;
  stepTitle: string;
  statement: string;
  mathEquation?: string;
  reasoning?: string;
}

export interface HandwrittenDerivation {
  id: string;
  title: string;
  marks: number;
  boardReference?: string;
  difficulty?: 'Standard' | 'Board Frequent' | 'High Weightage Derivation';
  aim: string;
  prerequisitesOrAssumptions?: string[];
  formulaDerived: string;
  diagramTitle?: string;
  diagramAsciiOrSteps?: string[];
  stepByStepDerivation: HandwrittenDerivationStep[];
  finalBoxedResult: string;
  physicalSignificance: string;
  topperTipOrWarning?: string;
}

export const SCIENCE_HANDWRITTEN_DERIVATIONS: Record<string, HandwrittenDerivation[]> = {
  // =========================================================================
  // SCIENCE 1 (PHYSICS + CHEMISTRY)
  // =========================================================================

  'Gravitation': [
    {
      id: 'grav-der-1',
      title: 'Derivation 1: Newton\'s Universal Inverse Square Law of Gravitation (from Kepler\'s 3rd Law)',
      marks: 3,
      boardReference: 'SSC Board March 2023 / July 2020 / Textbook Page 4',
      difficulty: 'High Weightage Derivation',
      aim: 'To mathematically deduce that the gravitational force of attraction between two bodies varies inversely as the square of the distance between them (F ∝ 1/r²).',
      prerequisitesOrAssumptions: [
        'Consider a planet of mass m revolving in a circular orbit of radius r around the Sun of mass M.',
        'Speed of planet is uniform, v = constant.',
        'Centripetal force acts towards the center (Sun): F = (m · v²) / r.',
        'Kepler\'s Third Law: The square of orbital period is proportional to cube of mean distance (T² ∝ r³, i.e., T²/r³ = K = constant).'
      ],
      formulaDerived: 'F = G · (M · m) / r²  ⟹  F ∝ 1/r²',
      diagramTitle: 'Centripetal Gravitational Vector Diagram',
      diagramAsciiOrSteps: [
        'Sun (M) at center (0,0)',
        'Orbit radius = r',
        'Planet (m) at perimeter with tangential velocity v',
        'Inward radial force: F = m·v²/r directed towards Sun'
      ],
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Speed of Revolving Planet',
          statement: 'Distance traveled by the planet in one revolution is equal to the circumference of the orbit (2πr). If T is the time period of revolution:',
          mathEquation: 'v = (Distance traveled) / (Time taken) = (2πr) / T',
          reasoning: 'Uniform circular motion velocity definition'
        },
        {
          stepNumber: 2,
          stepTitle: 'Centripetal Force Formula',
          statement: 'The centripetal force holding the planet in circular orbit is:',
          mathEquation: 'F = (m · v²) / r',
          reasoning: 'Newtonian centripetal force equation'
        },
        {
          stepNumber: 3,
          stepTitle: 'Substitute Speed v into Centripetal Force',
          statement: 'Substituting v = (2πr) / T into the force equation:',
          mathEquation: 'F = [m · (2πr / T)²] / r = [m · (4π²r² / T²)] / r = (4π² · m · r) / T²',
          reasoning: 'Algebraic substitution and squaring terms'
        },
        {
          stepNumber: 4,
          stepTitle: 'Multiply and Divide by r²',
          statement: 'To introduce Kepler\'s 3rd law ratio (T² / r³), multiply numerator and denominator by r²:',
          mathEquation: 'F = (4π² · m · r · r²) / (T² · r²) = (4π² · m · r³) / (T² · r²) = (4π² · m) / [r² · (T² / r³)]',
          reasoning: 'Creating Kepler\'s invariant ratio'
        },
        {
          stepNumber: 5,
          stepTitle: 'Apply Kepler\'s Third Law (T² / r³ = K)',
          statement: 'According to Kepler\'s Third Law of planetary motion, T² / r³ = K (constant for any planet revolving around the Sun):',
          mathEquation: 'F = (4π² · m) / (K · r²) = (4π² / K) · (m / r²)',
          reasoning: 'Kepler\'s Third Law: T²/r³ = K'
        },
        {
          stepNumber: 6,
          stepTitle: 'Conclusion of Inverse Square Relation',
          statement: 'Since (4π² / K) is a constant, and by Newton\'s 3rd law the force must also be proportional to the mass of the Sun (M):',
          mathEquation: 'F ∝ 1 / r²   and   F = G · (M · m) / r²',
          reasoning: 'Gravitational attraction is mutually proportional to masses and inversely proportional to square of distance'
        }
      ],
      finalBoxedResult: 'F = G · (M · m) / r²   ⟹   F ∝ 1/r²',
      physicalSignificance: 'Proves that planetary gravitation obeys the Inverse Square Law. If the distance between two planets is doubled, the gravitational force drops to 1/4th of its original value.',
      topperTipOrWarning: 'Do NOT forget to state Kepler\'s Third Law explicitly as T²/r³ = K. Multiplying by r²/r² in Step 4 is the golden key step that examiners look for!'
    },
    {
      id: 'grav-der-2',
      title: 'Derivation 2: Acceleration due to Gravity (g) at Earth\'s Surface & Variation with Altitude (h) and Depth (d)',
      marks: 4,
      boardReference: 'SSC Board Model Paper / March 2024 / Page 8',
      difficulty: 'High Weightage Derivation',
      aim: 'To derive the mathematical expression for acceleration due to gravity (g) at the surface of Earth, at height (h) above the surface, and at depth (d) below the surface.',
      prerequisitesOrAssumptions: [
        'Earth is a spherical body of mass M and radius R.',
        'An object of mass m is placed on Earth\'s surface.',
        'Universal gravitational constant = G.'
      ],
      formulaDerived: 'g = (G · M) / R²  ≈ 9.77 to 9.8 m/s² ;  g_h = g · [R / (R + h)]² ;  g_d = g · (1 - d/R)',
      diagramTitle: 'Earth Radius and Orbit Shell Diagram',
      diagramAsciiOrSteps: [
        'Center of Earth (O)',
        'Surface radius = R',
        'Object at height h: distance from center = (R + h)',
        'Object at depth d: distance from center = (R - d)'
      ],
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Force on Object at Surface',
          statement: 'By Newton\'s Law of Gravitation, the force of attraction exerted by Earth on mass m is:',
          mathEquation: 'F = (G · M · m) / R²',
          reasoning: 'Distance from mass to Earth\'s center is R'
        },
        {
          stepNumber: 2,
          stepTitle: 'Equate with Newton\'s Second Law',
          statement: 'By Newton\'s second law of motion, F = m · g (where g is acceleration due to gravity):',
          mathEquation: 'm · g = (G · M · m) / R²',
          reasoning: 'Gravitational force produces acceleration g'
        },
        {
          stepNumber: 3,
          stepTitle: 'Derivation of g at Surface',
          statement: 'Canceling the mass m of the object from both sides:',
          mathEquation: 'g = (G · M) / R²',
          reasoning: 'Shows that g depends ONLY on mass and radius of Earth, independent of the mass m of the falling body'
        },
        {
          stepNumber: 4,
          stepTitle: 'Variation with Altitude (Height h)',
          statement: 'At height h above Earth\'s surface, distance from center = (R + h). Therefore:',
          mathEquation: 'g_h = (G · M) / (R + h)² = [(G · M) / R²] · [R² / (R + h)²] = g · [R / (R + h)]²',
          reasoning: 'As altitude h increases, the denominator increases, so g decreases with height'
        },
        {
          stepNumber: 5,
          stepTitle: 'Variation with Depth (d below surface)',
          statement: 'At depth d, only the inner sphere of radius (R - d) exerts gravitational force (the outer spherical shell exerts net zero force). Mass of inner sphere M\' ∝ (R - d)³:',
          mathEquation: 'g_d = [G · M\'] / (R - d)² ∝ (R - d)  ⟹  g_d = g · [1 - (d / R)]',
          reasoning: 'At center of Earth (d = R): g_center = g(1 - 1) = 0 m/s²'
        }
      ],
      finalBoxedResult: 'Surface: g = (G · M) / R²  ≈ 9.8 m/s²  |  Height: g_h = g·[R / (R+h)]²  |  Depth: g_d = g·[1 - d/R]',
      physicalSignificance: 'At the center of the Earth, acceleration due to gravity g = 0. Furthermore, because Earth is flattened at the poles and bulges at the equator, R_pole < R_equator, so g_pole = 9.832 m/s² (highest) and g_equator = 9.78 m/s² (lowest).',
      topperTipOrWarning: 'Remember: A common mistake is writing g ∝ m. Acceleration due to gravity is strictly independent of the mass of the falling object!'
    },
    {
      id: 'grav-der-3',
      title: 'Derivation 3: Escape Velocity (v_esc) using Law of Conservation of Energy',
      marks: 4,
      boardReference: 'SSC Board March 2024 / July 2023 / Page 13',
      difficulty: 'High Weightage Derivation',
      aim: 'To derive the mathematical expression for the escape velocity of an object from the surface of Earth: v_esc = √(2GM/R) = √(2gR) ≈ 11.2 km/s.',
      prerequisitesOrAssumptions: [
        'Escape velocity (v_esc) is the minimum initial velocity required by a body to overcome Earth\'s gravitational pull and never return.',
        'At infinity (r = ∞), kinetic energy is ≥ 0 and potential energy is 0.',
        'Total Energy on Surface (E₁) = Total Energy at Infinity (E₂).'
      ],
      formulaDerived: 'v_esc = √(2GM / R) = √(2gR) ≈ 11.2 km/s',
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Total Energy of Object on Surface of Earth (E₁)',
          statement: 'Kinetic Energy on surface with velocity v_esc is (1/2)m·v_esc². Potential Energy on surface at distance R from center is -G·M·m / R:',
          mathEquation: 'E₁ = K.E. + P.E. = (1/2)m·v_esc² - (G·M·m / R)',
          reasoning: 'Gravitational potential energy is negative and zero at infinity'
        },
        {
          stepNumber: 2,
          stepTitle: 'Total Energy of Object at Infinite Distance (E₂)',
          statement: 'At infinity, the object comes to rest, so minimum kinetic energy is 0. Gravitational force at infinity is 0, so P.E. = -GMm/∞ = 0:',
          mathEquation: 'E₂ = K.E. + P.E. = 0 + 0 = 0',
          reasoning: 'At infinite distance, Earth\'s gravitational pull is negligible'
        },
        {
          stepNumber: 3,
          stepTitle: 'Apply Law of Conservation of Energy',
          statement: 'By Law of Conservation of Energy, E₁ = E₂:',
          mathEquation: '(1/2)m·v_esc² - (G·M·m / R) = 0',
          reasoning: 'Energy can neither be created nor destroyed'
        },
        {
          stepNumber: 4,
          stepTitle: 'Solve for v_esc',
          statement: 'Transposing the potential energy term to the right side and canceling mass m:',
          mathEquation: '(1/2)m·v_esc² = (G·M·m / R)  ⟹  v_esc² = (2G·M) / R  ⟹  v_esc = √(2GM / R)',
          reasoning: 'Multiplying by 2 and taking square root on both sides'
        },
        {
          stepNumber: 5,
          stepTitle: 'Express in terms of g (Acceleration due to gravity)',
          statement: 'Since g = (GM) / R², we have GM = g · R². Substituting GM = g·R²:',
          mathEquation: 'v_esc = √[2(g · R²) / R] = √(2gR)',
          reasoning: 'Substitute g = GM/R²'
        },
        {
          stepNumber: 6,
          stepTitle: 'Numerical Evaluation for Earth',
          statement: 'Substituting g = 9.8 m/s² and R = 6.4 × 10⁶ m (6400 km):',
          mathEquation: 'v_esc = √[2 × 9.8 × (6.4 × 10⁶)] = √[1.2544 × 10⁸] ≈ 11,200 m/s = 11.2 km/s',
          reasoning: 'Earth numerical constants substitution'
        }
      ],
      finalBoxedResult: 'v_esc = √(2GM / R) = √(2gR) = 11.2 km/s',
      physicalSignificance: 'Any projectile or rocket launched from Earth with a speed equal to or exceeding 11.2 km/s will permanently escape Earth\'s gravitational field and never fall back.',
      topperTipOrWarning: 'Make sure to write P.E. with a negative sign (-GMm/R). If you write positive P.E., the signs will cancel out incorrectly and examiners deduct 1 full mark!'
    }
  ],

  'Periodic Classification of Elements': [
    {
      id: 'pce-der-1',
      title: 'Derivation 1: Dobereiner\'s Law of Triads Arithmetic Mean Equation',
      marks: 2,
      boardReference: 'SSC Board July 2022 / Page 16',
      difficulty: 'Standard',
      aim: 'To mathematically verify that in Dobereiner\'s Triads, the atomic mass of the middle element is approximately equal to the arithmetic mean of the atomic masses of the first and third elements.',
      prerequisitesOrAssumptions: [
        'Elements are arranged in increasing order of their atomic masses in groups of three.',
        'Elements in a triad exhibit similar chemical properties.'
      ],
      formulaDerived: 'Atomic Mass of Middle Element ≈ (Atomic Mass of 1st + Atomic Mass of 3rd) / 2',
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'General Triad Formula',
          statement: 'Let elements A, B, and C form a triad with atomic masses a, b, and c arranged such that a < b < c:',
          mathEquation: 'b_calculated = (a + c) / 2',
          reasoning: 'Definition of arithmetic mean of two numbers'
        },
        {
          stepNumber: 2,
          stepTitle: 'Verification for Alkali Metal Triad (Li, Na, K)',
          statement: 'Atomic mass of Lithium (Li) = 6.9; Atomic mass of Potassium (K) = 39.1:',
          mathEquation: 'Mean = (6.9 + 39.1) / 2 = 46.0 / 2 = 23.0',
          reasoning: 'Actual atomic mass of Sodium (Na) is exactly 23.0. Perfect match!'
        },
        {
          stepNumber: 3,
          stepTitle: 'Verification for Alkaline Earth Metal Triad (Ca, Sr, Ba)',
          statement: 'Atomic mass of Calcium (Ca) = 40.1; Atomic mass of Barium (Ba) = 137.3:',
          mathEquation: 'Mean = (40.1 + 137.3) / 2 = 177.4 / 2 = 88.7',
          reasoning: 'Actual atomic mass of Strontium (Sr) = 87.6. Very close agreement!'
        }
      ],
      finalBoxedResult: 'Atomic Mass (B) ≈ [Atomic Mass (A) + Atomic Mass (C)] / 2',
      physicalSignificance: 'First mathematical attempt to correlate atomic mass with chemical properties, laying the historical foundation for Mendeleev and Modern Periodic Tables.',
      topperTipOrWarning: 'Always memorize the Li-Na-K (6.9, 23, 39.1) values because this exact numerical question is frequently asked in Board Objective Q1/Q2!'
    },
    {
      id: 'pce-der-2',
      title: 'Derivation 2: Periodic Trends in Effective Nuclear Charge (Z_eff) and Atomic Radius',
      marks: 3,
      boardReference: 'SSC Board March 2024 / Page 24',
      difficulty: 'High Weightage Derivation',
      aim: 'To derive the physical reason why atomic radius decreases across a period (left to right) and increases down a group (top to bottom).',
      prerequisitesOrAssumptions: [
        'Atomic radius is the distance from the center of the nucleus to the outermost valence shell.',
        'Effective nuclear charge Z_eff = Z - σ (where Z is atomic number/protons and σ is inner shell screening constant).'
      ],
      formulaDerived: 'Across a Period: Z_eff ↑  ⟹  Electrostatic Pull ↑  ⟹  Atomic Radius ↓ | Down a Group: Shells n ↑  ⟹  Atomic Radius ↑',
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Trend Across a Period (Left to Right)',
          statement: 'Across a period, the principal quantum number (number of shells n) remains constant. However, the atomic number Z increases by 1 unit at each successive element:',
          mathEquation: 'ΔZ = +1 proton in nucleus ; valence electrons enter the SAME shell',
          reasoning: 'No new shielding layer is added'
        },
        {
          stepNumber: 2,
          stepTitle: 'Effective Nuclear Pull Across Period',
          statement: 'Because the positive charge in the nucleus increases while distance remains similar, the attractive electrostatic force on valence electrons increases:',
          mathEquation: 'F_attraction = [Z_eff · e²] / (4πε₀ · r²)  ⟹  Increases from left to right',
          reasoning: 'Coulomb\'s Law of electrostatic attraction'
        },
        {
          stepNumber: 3,
          stepTitle: 'Result for Atomic Radius in Period',
          statement: 'Electrons are pulled closer to the nucleus, contracting the electron cloud:',
          mathEquation: 'Atomic Radius: Li (152 pm) > Be (111 pm) > B (88 pm) > C (77 pm) > N (74 pm) > O (66 pm) > F (64 pm)',
          reasoning: 'Atomic radius steadily decreases across a period'
        },
        {
          stepNumber: 4,
          stepTitle: 'Trend Down a Group (Top to Bottom)',
          statement: 'Going down a group, a completely new electronic shell is added at each step (e.g. Group 1: Li has 2 shells, Na has 3 shells, K has 4 shells):',
          mathEquation: 'r ∝ n²  (where n is principal shell number)',
          reasoning: 'Distance between nucleus and outermost shell increases dramatically, outweighing increased nuclear charge'
        }
      ],
      finalBoxedResult: 'Period (Left → Right): Radius DECREASES | Group (Top → Bottom): Radius INCREASES',
      physicalSignificance: 'Explains why alkali metals have the largest atoms in each period while halogens have the smallest, determining metallic character, electronegativity, and chemical reactivity.',
      topperTipOrWarning: 'State two separate factors for full marks: 1. In a period: same shell, increased nuclear charge pulls electrons closer. 2. In a group: new shell added, distance increases.'
    }
  ],

  'Chemical Reactions and Equations': [
    {
      id: 'chem-der-1',
      title: 'Derivation 1: Algebraic / Stoichiometric Method of Balancing Chemical Equations (Law of Conservation of Mass)',
      marks: 3,
      boardReference: 'SSC Board Frequent Question / Page 34',
      difficulty: 'High Weightage Derivation',
      aim: 'To derive a rigorous mathematical system of linear equations to balance any chemical equation, upholding Lavoisier\'s Law of Conservation of Mass (Total mass of reactants = Total mass of products).',
      prerequisitesOrAssumptions: [
        'In any chemical reaction, atoms can neither be created nor destroyed.',
        'Number of atoms of each element on Reactant side = Number of atoms of each element on Product side.'
      ],
      formulaDerived: 'Σ [n_reactants × Atom_i] = Σ [n_products × Atom_i]',
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Assign Algebraic Coefficients',
          statement: 'Consider the reaction of Iron with Steam to form Magnetic Iron Oxide and Hydrogen: a·Fe + b·H₂O ⟶ c·Fe₃O₄ + d·H₂',
          mathEquation: 'a Fe + b H₂O ⟶ c Fe₃O₄ + d H₂',
          reasoning: 'Where a, b, c, d are the smallest positive integers'
        },
        {
          stepNumber: 2,
          stepTitle: 'Formulate Conservation Equations for Each Element',
          statement: 'Equate atom counts for each element on left and right sides:',
          mathEquation: 'For Iron (Fe): a = 3c\nFor Hydrogen (H): 2b = 2d  ⟹  b = d\nFor Oxygen (O): b = 4c',
          reasoning: 'Law of Conservation of Matter for each element'
        },
        {
          stepNumber: 3,
          stepTitle: 'Solve the System of Equations',
          statement: 'Let c = 1 (simplest integer assignment):\nIf c = 1  ⟹  a = 3(1) = 3\nSince b = 4c  ⟹  b = 4(1) = 4\nSince d = b  ⟹  d = 4',
          mathEquation: 'a = 3, b = 4, c = 1, d = 4',
          reasoning: 'Integer substitution and ratio evaluation'
        },
        {
          stepNumber: 4,
          stepTitle: 'Substitute Coefficients back into Equation',
          statement: 'Writing the balanced equation with physical states:',
          mathEquation: '3Fe(s) + 4H₂O(g) ⟶ Fe₃O₄(s) + 4H₂(g) ↑',
          reasoning: 'Verification: Left side: 3 Fe, 8 H, 4 O. Right side: 3 Fe, 8 H, 4 O. Balanced!'
        }
      ],
      finalBoxedResult: '3Fe(s) + 4H₂O(g) ⟶ Fe₃O₄(s) + 4H₂(g) ↑',
      physicalSignificance: 'Guarantees that mass is strictly conserved during a chemical transformation. Essential for industrial chemical manufacturing and stoichiometric calculations.',
      topperTipOrWarning: 'Always include the physical states (s, l, g, aq) and gas evolution arrow (↑) or precipitate arrow (↓) in board answers!'
    }
  ],

  'Effects of Electric Current': [
    {
      id: 'elec-der-1',
      title: 'Derivation 1: Joule\'s Law of Heating (H = I²Rt = VIt = V²t/R)',
      marks: 3,
      boardReference: 'SSC Board March 2024 / July 2023 / Page 48',
      difficulty: 'High Weightage Derivation',
      aim: 'To mathematically derive Joule\'s Law of Heating: The amount of heat produced (H) in a conductor of resistance R when current I flows for time t is H = I²Rt.',
      prerequisitesOrAssumptions: [
        'A potential difference V is applied across a conductor of resistance R.',
        'Current I flows through the conductor for time t.',
        'Charge flowing Q = I · t.',
        'All electrical work done (W) is completely converted into heat energy (H).'
      ],
      formulaDerived: 'H = W = V · I · t = I² · R · t = (V² · t) / R  Joules',
      diagramTitle: 'Electric Circuit with Heating Resistor',
      diagramAsciiOrSteps: [
        'Battery (+ / -) with key K',
        'Ammeter in series, Voltmeter across resistor R',
        'Current I flows from positive to negative terminal',
        'Work done against resistance dissipated as heat H'
      ],
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Electric Work Done Definition',
          statement: 'Potential difference V is defined as the work done (W) in moving a unit positive charge across two points (V = W / Q):',
          mathEquation: 'W = V · Q',
          reasoning: 'Definition of Electric Potential Difference'
        },
        {
          stepNumber: 2,
          stepTitle: 'Relation between Electric Charge and Current',
          statement: 'Electric current I is defined as the rate of flow of charge (I = Q / t), which gives:',
          mathEquation: 'Q = I · t',
          reasoning: 'Definition of Electric Current'
        },
        {
          stepNumber: 3,
          stepTitle: 'Substitute Q into Work Equation',
          statement: 'Substituting Q = I · t into W = V · Q:',
          mathEquation: 'W = V · (I · t) = V · I · t',
          reasoning: 'Electrical energy supplied by the source'
        },
        {
          stepNumber: 4,
          stepTitle: 'Apply Ohm\'s Law (V = I · R)',
          statement: 'According to Ohm\'s Law, the potential difference across a conductor is V = I · R. Substituting V = I · R into the work equation:',
          mathEquation: 'W = (I · R) · I · t = I² · R · t',
          reasoning: 'Ohm\'s Law substitution'
        },
        {
          stepNumber: 5,
          stepTitle: 'Equate Work Done to Heat Dissipated',
          statement: 'Since the conductor has pure resistance, all electrical work done is dissipated as heat energy H (W = H):',
          mathEquation: 'H = I² · R · t  (Joules)',
          reasoning: 'Principle of Conservation of Energy'
        },
        {
          stepNumber: 6,
          stepTitle: 'Alternate Forms of Joule\'s Heating Formula',
          statement: 'Using I = V / R from Ohm\'s law:\nH = (V / R)² · R · t = (V² / R²) · R · t = (V² · t) / R',
          mathEquation: 'H = V · I · t = I² · R · t = (V² · t) / R',
          reasoning: 'Useful when potential difference and resistance are known'
        }
      ],
      finalBoxedResult: 'H = I² · R · t   (Joules)   |   In Calories: H = (I² · R · t) / 4.18 Cal',
      physicalSignificance: 'Explains the working principle of electric irons, geysers, toasters, and electric fuses (Joule heating). Shows that heat produced is proportional to square of current (I²).',
      topperTipOrWarning: 'If the question asks for Heat in calories, remember to divide Joules by 4.18 (J = 4.18 J/cal). Never leave out the units!'
    },
    {
      id: 'elec-der-2',
      title: 'Derivation 2: Electrical Power & Derivation of 1 Kilowatt-hour (1 Unit) in Joules',
      marks: 3,
      boardReference: 'SSC Board March 2023 / Page 49',
      difficulty: 'High Weightage Derivation',
      aim: 'To derive the formulas for electric power (P = VI = I²R = V²/R) and show that 1 kWh (1 board unit of electricity) equals exactly 3.6 × 10⁶ Joules.',
      prerequisitesOrAssumptions: [
        'Electric power is the rate at which electrical energy is consumed: P = Energy / time = W / t.',
        '1 kilowatt (kW) = 1000 Watts.',
        '1 hour = 60 minutes = 3600 seconds.'
      ],
      formulaDerived: 'P = V · I = I² · R = V² / R   |   1 kWh = 3.6 × 10⁶ J',
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Definition of Electric Power',
          statement: 'Power is the rate of doing electrical work:',
          mathEquation: 'P = W / t',
          reasoning: 'Definition of power'
        },
        {
          stepNumber: 2,
          stepTitle: 'Substitute Electrical Energy W = V · I · t',
          statement: 'Since W = V · I · t:',
          mathEquation: 'P = (V · I · t) / t = V · I',
          reasoning: 'Time t cancels out'
        },
        {
          stepNumber: 3,
          stepTitle: 'Power in terms of Resistance (Ohm\'s Law)',
          statement: 'Using V = I · R: P = (I · R) · I = I² · R.\nUsing I = V / R: P = V · (V / R) = V² / R.',
          mathEquation: 'P = V · I = I² · R = V² / R  (Watts or J/s)',
          reasoning: 'Ohm\'s Law variants of electric power'
        },
        {
          stepNumber: 4,
          stepTitle: 'Derivation of 1 Kilowatt-hour (1 kWh)',
          statement: '1 Kilowatt-hour is the energy consumed by a 1000 W appliance operated continuously for 1 hour:',
          mathEquation: '1 kWh = 1 kW × 1 hour = 1000 W × 3600 seconds',
          reasoning: 'Conversion: 1 kW = 10³ W and 1 hr = 3600 s'
        },
        {
          stepNumber: 5,
          stepTitle: 'Express in Standard Scientific Notation',
          statement: 'Since 1 Watt = 1 Joule/second:',
          mathEquation: '1 kWh = 1000 (J/s) × 3600 s = 3,600,000 Joules = 3.6 × 10⁶ Joules',
          reasoning: 'Dimensional consistency in SI units'
        }
      ],
      finalBoxedResult: 'P = V · I = I² · R = V² / R   |   1 kWh (1 Commercial Unit) = 3.6 × 10⁶ J',
      physicalSignificance: 'Used on every household electricity bill in Maharashtra (MSEDCL). 1 Unit = 1 kWh = 3.6 million Joules.',
      topperTipOrWarning: 'Common board exam question: "How many Joules are there in 1 kWh?" Write both 3.6 × 10⁶ J and 36,00,000 J to avoid any ambiguity.'
    },
    {
      id: 'elec-der-3',
      title: 'Derivation 3: Equivalent Resistance in Series (R_s) and Parallel (1/R_p)',
      marks: 4,
      boardReference: 'SSC Board Frequent Question / Page 50',
      difficulty: 'High Weightage Derivation',
      aim: 'To derive: 1) Series: R_s = R₁ + R₂ + R₃, and 2) Parallel: 1/R_p = 1/R₁ + 1/R₂ + 1/R₃.',
      prerequisitesOrAssumptions: [
        'Series connection: Same current I flows through all resistors; Total voltage V = V₁ + V₂ + V₃.',
        'Parallel connection: Same voltage V across all resistors; Total current I = I₁ + I₂ + I₃.'
      ],
      formulaDerived: 'Series: R_s = R₁ + R₂ + R₃   |   Parallel: 1/R_p = 1/R₁ + 1/R₂ + 1/R₃',
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Series Derivation - Voltage Conservation',
          statement: 'Total potential difference across the series combination is the sum of voltages across individual resistors:',
          mathEquation: 'V = V₁ + V₂ + V₃',
          reasoning: 'Conservation of electrical potential'
        },
        {
          stepNumber: 2,
          stepTitle: 'Substitute Ohm\'s Law for Series',
          statement: 'By Ohm\'s law, V = I · R_s, V₁ = I · R₁, V₂ = I · R₂, V₃ = I · R₃ (current I is identical):',
          mathEquation: 'I · R_s = I · R₁ + I · R₂ + I · R₃  ⟹  I · R_s = I · (R₁ + R₂ + R₃)',
          reasoning: 'Divide both sides by common current I'
        },
        {
          stepNumber: 3,
          stepTitle: 'Result for Series Equivalent Resistance',
          statement: 'Canceling current I gives:',
          mathEquation: 'R_s = R₁ + R₂ + R₃',
          reasoning: 'Equivalent resistance in series is always greater than the largest individual resistor'
        },
        {
          stepNumber: 4,
          stepTitle: 'Parallel Derivation - Current Conservation',
          statement: 'Total current I entering the parallel junction splits into branches:',
          mathEquation: 'I = I₁ + I₂ + I₃',
          reasoning: 'Kirchhoff\'s Junction Law / conservation of electric charge'
        },
        {
          stepNumber: 5,
          stepTitle: 'Substitute Ohm\'s Law for Parallel',
          statement: 'By Ohm\'s law, I = V / R_p, I₁ = V / R₁, I₂ = V / R₂, I₃ = V / R₃ (voltage V is identical):',
          mathEquation: 'V / R_p = V / R₁ + V / R₂ + V / R₃  ⟹  V · (1 / R_p) = V · (1/R₁ + 1/R₂ + 1/R₃)',
          reasoning: 'Divide both sides by common potential difference V'
        },
        {
          stepNumber: 6,
          stepTitle: 'Result for Parallel Equivalent Resistance',
          statement: 'Canceling voltage V gives:',
          mathEquation: '1 / R_p = 1 / R₁ + 1 / R₂ + 1 / R₃   (For two resistors: R_p = (R₁ · R₂) / (R₁ + R₂))',
          reasoning: 'Equivalent resistance in parallel is always smaller than the smallest individual resistor'
        }
      ],
      finalBoxedResult: 'Series: R_s = R₁ + R₂ + R₃  |  Parallel: 1/R_p = 1/R₁ + 1/R₂ + 1/R₃',
      physicalSignificance: 'Household appliances are always connected in parallel because if one appliance fails, the others continue working, and each receives the full rated 220V.',
      topperTipOrWarning: 'For two resistors in parallel, write the shortcut product-over-sum formula: R_p = (R₁ × R₂) / (R₁ + R₂). It saves calculating common denominators in numericals!'
    }
  ],

  'Heat': [
    {
      id: 'heat-der-1',
      title: 'Derivation 1: Principle of Heat Exchange (Calorimetry Formula)',
      marks: 3,
      boardReference: 'SSC Board March 2024 / Page 68',
      difficulty: 'High Weightage Derivation',
      aim: 'To mathematically derive the Principle of Heat Exchange: Heat lost by hot object = Heat gained by cold object + Heat gained by calorimeter.',
      prerequisitesOrAssumptions: [
        'System is kept in a thermally insulated container (calorimeter) so that no heat is exchanged with the surrounding environment.',
        'Hot solid object of mass m₁, specific heat c₁, and initial temperature T₁.',
        'Cold water of mass m₂, specific heat c₂ = 1 cal/g·°C, initial temperature T₂.',
        'Calorimeter vessel of mass m_c, specific heat c_c, initial temperature T₂.',
        'Final equilibrium mixture temperature = T_m (where T₂ < T_m < T₁).'
      ],
      formulaDerived: 'm₁ · c₁ · (T₁ - T_m) = m₂ · c₂ · (T_m - T₂) + m_c · c_c · (T_m - T₂)',
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Formula for Heat Gained or Lost',
          statement: 'Heat energy absorbed or released by a substance of mass m, specific heat c, experiencing temperature change ΔT is:',
          mathEquation: 'Q = m · c · ΔT',
          reasoning: 'Definition of Specific Heat Capacity'
        },
        {
          stepNumber: 2,
          stepTitle: 'Heat Lost by Hot Substance (Q₁)',
          statement: 'The hot solid cools down from temperature T₁ to final equilibrium temperature T_m:',
          mathEquation: 'Q₁ = m₁ · c₁ · (T₁ - T_m)',
          reasoning: 'Temperature drop is ΔT₁ = (T₁ - T_m)'
        },
        {
          stepNumber: 3,
          stepTitle: 'Heat Gained by Cold Water (Q₂)',
          statement: 'The water warms up from initial temperature T₂ to equilibrium temperature T_m:',
          mathEquation: 'Q₂ = m₂ · c₂ · (T_m - T₂)',
          reasoning: 'Temperature rise is ΔT₂ = (T_m - T₂)'
        },
        {
          stepNumber: 4,
          stepTitle: 'Heat Gained by Calorimeter Vessel (Q₃)',
          statement: 'The calorimeter container also warms up from T₂ to T_m:',
          mathEquation: 'Q₃ = m_c · c_c · (T_m - T₂)',
          reasoning: 'Calorimeter is in thermal contact with the water'
        },
        {
          stepNumber: 5,
          stepTitle: 'Apply Principle of Heat Exchange',
          statement: 'According to the law of conservation of energy in an isolated system:\nHeat lost by hot object = Heat gained by cold object + Heat gained by calorimeter',
          mathEquation: 'm₁ · c₁ · (T₁ - T_m) = [m₂ · c₂ + m_c · c_c] · (T_m - T₂)',
          reasoning: 'Net heat flow = 0 in adiabatic isolation'
        },
        {
          stepNumber: 6,
          stepTitle: 'Solving for Specific Heat of Unknown Solid (c₁)',
          statement: 'Transposing the mass and temperature factor:',
          mathEquation: 'c₁ = { [m₂ · c₂ + m_c · c_c] · (T_m - T₂) } / [m₁ · (T₁ - T_m)]',
          reasoning: 'Used experimentally to determine specific heat of iron, copper, lead'
        }
      ],
      finalBoxedResult: 'Q_lost = Q_gained  ⟹  m₁·c₁·(T₁ - T_m) = (m₂·c₂ + m_c·c_c)·(T_m - T₂)',
      physicalSignificance: 'Forms the scientific basis of calorimetry. Explains why water is used as an industrial coolant and in hot-water bottles (water has an unusually high specific heat capacity of 1 cal/g·°C or 4184 J/kg·°C).',
      topperTipOrWarning: 'Remember that (T₁ - T_m) is positive because T₁ > T_m, and (T_m - T₂) is positive because T_m > T₂. Never write (T₂ - T_m)!'
    },
    {
      id: 'heat-der-2',
      title: 'Derivation 2: Relative Humidity (%) and Dew Point Mathematical Formulation',
      marks: 2,
      boardReference: 'SSC Board July 2022 / Page 66',
      difficulty: 'Standard',
      aim: 'To mathematically derive the formula for percentage Relative Humidity (% RH) in terms of actual vapor mass and saturation vapor mass at a given temperature.',
      prerequisitesOrAssumptions: [
        'Dew point is the temperature at which the air becomes saturated with water vapor.',
        'At dew point, Relative Humidity = 100%.'
      ],
      formulaDerived: '% Relative Humidity = [Actual mass of water vapor / Saturated mass of water vapor] × 100%',
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Definition of Relative Humidity',
          statement: 'Relative humidity is the ratio of the actual mass of water vapor present in a given volume of air to the mass of water vapor required to saturate that same volume of air at that temperature:',
          mathEquation: '% RH = [m_actual / m_saturated] × 100%',
          reasoning: 'Definition of RH'
        },
        {
          stepNumber: 2,
          stepTitle: 'In terms of Vapor Pressures',
          statement: 'By ideal gas behavior, mass is proportional to partial vapor pressure:',
          mathEquation: '% RH = [Partial Pressure of Water Vapor (p_v) / Saturated Vapor Pressure (p_sat)] × 100%',
          reasoning: 'Dalton\'s law of partial pressures'
        },
        {
          stepNumber: 3,
          stepTitle: 'Condition at Dew Point',
          statement: 'If temperature drops to the Dew Point Temperature (T_dew), the actual vapor pressure equals the saturation vapor pressure:',
          mathEquation: 'p_v = p_sat(T_dew)  ⟹  % RH = 100%',
          reasoning: 'Condensation begins; dew droplets form on leaves'
        }
      ],
      finalBoxedResult: '% RH = (Actual Vapor Mass / Saturated Vapor Mass) × 100%',
      physicalSignificance: 'When RH > 60%, air feels humid and sweat does not evaporate easily. When RH < 60%, air feels dry and skin turns rough.',
      topperTipOrWarning: 'Board MCQs often ask: "At dew point, the relative humidity is ____ %" ➔ Answer: 100%.'
    }
  ],

  'Refraction of Light': [
    {
      id: 'refr-der-1',
      title: 'Derivation 1: Snell\'s Law & Refractive Index (Absolute vs Relative & Reciprocal Relation)',
      marks: 3,
      boardReference: 'SSC Board March 2024 / Page 74',
      difficulty: 'High Weightage Derivation',
      aim: 'To mathematically formulate Snell\'s Law of Refraction, define absolute and relative refractive indices, and prove the reciprocal property: ₂n₁ = 1 / ₁n₂.',
      prerequisitesOrAssumptions: [
        'A light ray travels from medium 1 (speed v₁) to medium 2 (speed v₂).',
        'Angle of incidence = i, Angle of refraction = r.',
        'Speed of light in vacuum = c ≈ 3 × 10⁸ m/s.'
      ],
      formulaDerived: '₁n₂ = (sin i / sin r) = (v₁ / v₂)   |   ₂n₁ = 1 / ₁n₂   |   n = c / v',
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Snell\'s Second Law of Refraction',
          statement: 'For a given pair of media, the ratio of sine of angle of incidence to sine of angle of refraction is constant, called refractive index of medium 2 with respect to medium 1 (₁n₂):',
          mathEquation: '₁n₂ = sin i / sin r',
          reasoning: 'Snell\'s Law'
        },
        {
          stepNumber: 2,
          stepTitle: 'Refractive Index in terms of Wave Speeds',
          statement: 'Refractive index is physically determined by the ratio of speed of light in medium 1 to speed of light in medium 2:',
          mathEquation: '₁n₂ = v₁ / v₂',
          reasoning: 'Wave theory of refraction'
        },
        {
          stepNumber: 3,
          stepTitle: 'Express in terms of Absolute Refractive Indices',
          statement: 'Absolute refractive index of medium 1 is n₁ = c / v₁ (so v₁ = c / n₁). Absolute refractive index of medium 2 is n₂ = c / v₂ (so v₂ = c / n₂):',
          mathEquation: '₁n₂ = (c / n₁) / (c / n₂) = (c / n₁) × (n₂ / c) = n₂ / n₁',
          reasoning: 'Relation between absolute and relative refractive indices'
        },
        {
          stepNumber: 4,
          stepTitle: 'Proof of Reciprocal Relation',
          statement: 'Conversely, refractive index of medium 1 with respect to medium 2 is ₂n₁ = v₂ / v₁ = n₁ / n₂:',
          mathEquation: '₂n₁ = 1 / (n₂ / n₁) = 1 / ₁n₂  ⟹  ₁n₂ × ₂n₁ = 1',
          reasoning: 'Principle of Reversibility of Light'
        }
      ],
      finalBoxedResult: '₁n₂ = (sin i / sin r) = (v₁ / v₂) = (n₂ / n₁)   |   ₂n₁ = 1 / ₁n₂',
      physicalSignificance: 'If medium 2 is optically denser than medium 1 (v₂ < v₁), then ₁n₂ > 1, so sin i > sin r ⟹ r < i (the refracted ray bends TOWARDS the normal).',
      topperTipOrWarning: 'Watch out for notation! ₁n₂ means refractive index of medium 2 with respect to medium 1. Many students write it backwards!'
    },
    {
      id: 'refr-der-2',
      title: 'Derivation 2: Critical Angle (i_c) and Total Internal Reflection (TIR)',
      marks: 3,
      boardReference: 'SSC Board March 2023 / Page 76',
      difficulty: 'High Weightage Derivation',
      aim: 'To derive the mathematical relationship between the critical angle (i_c) and the refractive index (n) when light travels from a denser to a rarer medium: sin i_c = 1 / n.',
      prerequisitesOrAssumptions: [
        'Light must travel from an optically denser medium (refractive index n) to an optically rarer medium (air, refractive index = 1).',
        'Critical angle i_c is the angle of incidence in the denser medium for which angle of refraction in rarer medium is r = 90°.'
      ],
      formulaDerived: 'sin i_c = 1 / n   ⟹   i_c = sin⁻¹(1 / n)',
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Apply Snell\'s Law for Denser to Rarer Medium',
          statement: 'Let light travel from medium 1 (denser, refractive index n₁ = n) to medium 2 (rarer air, refractive index n₂ = 1):',
          mathEquation: 'n₁ · sin i = n₂ · sin r  ⟹  n · sin i = 1 · sin r',
          reasoning: 'Generalized form of Snell\'s law'
        },
        {
          stepNumber: 2,
          stepTitle: 'Substitute Critical Angle Conditions',
          statement: 'At the critical angle, i = i_c and the refracted ray grazes the interface, so r = 90° (sin 90° = 1):',
          mathEquation: 'n · sin i_c = 1 · sin 90° = 1 · 1 = 1',
          reasoning: 'By definition of critical angle, r = 90°'
        },
        {
          stepNumber: 3,
          stepTitle: 'Solve for sin i_c',
          statement: 'Dividing both sides by refractive index n:',
          mathEquation: 'sin i_c = 1 / n  ⟹  i_c = sin⁻¹(1 / n)',
          reasoning: 'Transposing n'
        },
        {
          stepNumber: 4,
          stepTitle: 'Condition for Total Internal Reflection (TIR)',
          statement: 'If the angle of incidence i exceeds the critical angle (i > i_c), no light can refract into the second medium. All light is reflected back into the denser medium:',
          mathEquation: 'For i > i_c : 100% of incident light is reflected back internally',
          reasoning: 'Law of Total Internal Reflection'
        }
      ],
      finalBoxedResult: 'sin i_c = 1 / n   |   For Glass (n = 1.5): i_c ≈ 42°  |  For Diamond (n = 2.42): i_c ≈ 24.4°',
      physicalSignificance: 'Explains the brilliance of diamonds (very low critical angle of 24.4°), mirage formation in hot deserts, and lossless data transmission in optical fiber cables.',
      topperTipOrWarning: 'Two mandatory conditions for TIR must always be written in the exam: 1. Light must travel from DENSER to RARER medium. 2. Angle of incidence must be GREATER than critical angle (i > i_c).'
    }
  ],

  'Lenses': [
    {
      id: 'lens-der-1',
      title: 'Derivation 1: Thin Lens Formula (1/f = 1/v - 1/u) from Geometric Optics',
      marks: 4,
      boardReference: 'SSC Board Model Question / Page 84',
      difficulty: 'High Weightage Derivation',
      aim: 'To derive the fundamental Thin Lens Formula connecting focal length (f), image distance (v), and object distance (u): 1/f = 1/v - 1/u.',
      prerequisitesOrAssumptions: [
        'Consider a thin convex lens of focal length f with optical center O.',
        'An object AB of height h₁ is placed perpendicular to principal axis at distance u.',
        'A real, inverted image A\'B\' of height h₂ is formed at distance v.',
        'Cartesian Sign Convention: Object distance u = -u; Image distance v = +v; Focal length f = +f.'
      ],
      formulaDerived: '1 / f = (1 / v) - (1 / u)',
      diagramTitle: 'Convex Lens Ray Construction Diagram',
      diagramAsciiOrSteps: [
        'Object AB on left of lens, height = h₁',
        'Ray 1: Parallel to axis refracts through Focus F₂ on right',
        'Ray 2: Through optical center O passes undeviated',
        'Intersection forms inverted image A\'B\' on right, height = h₂'
      ],
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Identify Similar Triangles (ΔABO and ΔA\'B\'O)',
          statement: 'In right-angled triangles ΔABO and ΔA\'B\'O:\n∠ABO = ∠A\'B\'O = 90°\n∠AOB = ∠A\'OB\' (vertically opposite angles)\nTherefore, ΔABO ~ ΔA\'B\'O (by AA similarity criterion):',
          mathEquation: 'A\'B\' / AB = OB\' / OB',
          reasoning: 'Corresponding sides of similar triangles are in equal ratio'
        },
        {
          stepNumber: 2,
          stepTitle: 'Identify Second Pair of Similar Triangles (ΔMOF₂ and ΔA\'B\'F₂)',
          statement: 'From the lens aperture, drop perpendicular MO to the principal axis (MO = AB):\nΔMOF₂ ~ ΔA\'B\'F₂ (by AA similarity criterion):',
          mathEquation: 'A\'B\' / MO = F₂B\' / OF₂   ⟹   A\'B\' / AB = F₂B\' / OF₂',
          reasoning: 'Since MO = AB (incident ray is parallel to principal axis)'
        },
        {
          stepNumber: 3,
          stepTitle: 'Equate the Two Equations',
          statement: 'From Step 1 and Step 2, the left-hand side is identical (A\'B\' / AB):',
          mathEquation: 'OB\' / OB = F₂B\' / OF₂',
          reasoning: 'Transitive property of equality'
        },
        {
          stepNumber: 4,
          stepTitle: 'Express Segment F₂B\' in terms of OB\' and OF₂',
          statement: 'Looking at the principal axis, segment F₂B\' = OB\' - OF₂. Substituting this in:',
          mathEquation: 'OB\' / OB = (OB\' - OF₂) / OF₂',
          reasoning: 'Line segment subtraction along the axis'
        },
        {
          stepNumber: 5,
          stepTitle: 'Apply Cartesian Sign Convention',
          statement: 'Substituting Cartesian distances:\nOB = -u (measured against incident light)\nOB\' = +v (measured in direction of incident light)\nOF₂ = +f (focus of convex lens is positive):',
          mathEquation: '(+v) / (-u) = (+v - f) / (+f)  ⟹  -v / u = (v - f) / f',
          reasoning: 'New Cartesian Sign Convention'
        },
        {
          stepNumber: 6,
          stepTitle: 'Cross-Multiply and Rearrange',
          statement: 'Multiplying both sides:\n-v · f = u · (v - f)\n-vf = uv - uf\nTransposing terms: uf - vf = uv',
          mathEquation: 'uf - vf = uv',
          reasoning: 'Algebraic expansion'
        },
        {
          stepNumber: 7,
          stepTitle: 'Divide throughout by (u · v · f)',
          statement: 'Dividing each term by uvf:',
          mathEquation: '(uf / uvf) - (vf / uvf) = (uv / uvf)  ⟹  (1 / v) - (1 / u) = 1 / f',
          reasoning: 'Dividing by uvf produces the standard reciprocal form'
        }
      ],
      finalBoxedResult: '1 / f = (1 / v) - (1 / u)',
      physicalSignificance: 'The master formula for calculating image distances, focal lengths, and camera / microscope / telescope optics. For convex lens, f is always positive (+); for concave lens, f is always negative (-).',
      topperTipOrWarning: 'Never confuse with the Mirror Formula! In Mirror formula it is 1/f = 1/v + 1/u (PLUS). In Lens formula it is 1/f = 1/v - 1/u (MINUS)!'
    },
    {
      id: 'lens-der-2',
      title: 'Derivation 2: Linear Magnification (M) & Lens Power Combination (P = P₁ + P₂)',
      marks: 3,
      boardReference: 'SSC Board March 2023 / Page 85',
      difficulty: 'High Weightage Derivation',
      aim: 'To derive: 1) Magnification M = h₂/h₁ = v/u, and 2) Equivalent power of two thin lenses in contact: P = P₁ + P₂ ⟹ 1/F = 1/f₁ + 1/f₂.',
      prerequisitesOrAssumptions: [
        'Magnification is the ratio of height of image (h₂) to height of object (h₁).',
        'Power of a lens is the reciprocal of focal length measured in meters: P = 1 / f(m) (Dioptre, D).'
      ],
      formulaDerived: 'M = h₂ / h₁ = v / u   |   P = 1 / f(m)   |   P_net = P₁ + P₂',
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Magnification from Similar Triangles',
          statement: 'From the triangle similarity in lens derivation, A\'B\' / AB = OB\' / OB. Using sign conventions (AB = +h₁, A\'B\' = -h₂ for inverted image, OB = -u, OB\' = +v):',
          mathEquation: '(-h₂) / (+h₁) = (+v) / (-u)  ⟹  -(h₂ / h₁) = -(v / u)  ⟹  h₂ / h₁ = v / u',
          reasoning: 'Signs cancel out cleanly'
        },
        {
          stepNumber: 2,
          stepTitle: 'Result for Linear Magnification',
          statement: 'Therefore, magnification for a lens is:',
          mathEquation: 'M = h₂ / h₁ = v / u',
          reasoning: 'If M is negative, image is real & inverted; if M is positive, image is virtual & erect'
        },
        {
          stepNumber: 3,
          stepTitle: 'Derivation of Two Lenses in Contact',
          statement: 'For lens 1 of focal length f₁, image is formed at v\': (1/v\') - (1/u) = 1/f₁.\nThis image acts as virtual object for lens 2 of focal length f₂: (1/v) - (1/v\') = 1/f₂.\nAdding both equations:',
          mathEquation: '[(1/v\') - (1/u)] + [(1/v) - (1/v\')] = 1/f₁ + 1/f₂  ⟹  (1/v) - (1/u) = 1/f₁ + 1/f₂',
          reasoning: 'The intermediate term (1/v\') cancels out'
        },
        {
          stepNumber: 4,
          stepTitle: 'Equivalent Focal Length and Power',
          statement: 'Since (1/v) - (1/u) = 1/F (where F is equivalent focal length):',
          mathEquation: '1 / F = (1 / f₁) + (1 / f₂)   ⟹   P = P₁ + P₂',
          reasoning: 'Since Power P = 1/f'
        }
      ],
      finalBoxedResult: 'M = h₂ / h₁ = v / u   |   P = P₁ + P₂   (Dioptre, D)',
      physicalSignificance: 'Opticians combine multiple lenses to eliminate aberrations and design correct spectacles (e.g., +2.0 D convex lens combined with -0.5 D concave lens gives net power +1.5 D).',
      topperTipOrWarning: 'Make sure focal length is converted to METRES before calculating Power in Dioptres! If f = 20 cm = 0.2 m, P = 1/0.2 = +5 D.'
    }
  ],

  'Metallurgy': [
    {
      id: 'met-der-1',
      title: 'Derivation 1: Faraday\'s Electrolytic Extraction Mass Equation & Hall-Héroult Mass Balance',
      marks: 3,
      boardReference: 'SSC Board Frequent Concept / Page 104',
      difficulty: 'High Weightage Derivation',
      aim: 'To derive the quantitative stoichiometric mass equation for Aluminium deposition at the cathode in the Hall-Héroult electrolytic reduction of Alumina (Al₂O₃).',
      prerequisitesOrAssumptions: [
        'Hall-Héroult cell contains molten Alumina (Al₂O₃) dissolved in Cryolite (Na₃AlF₆) and Fluorspar (CaF₂) to lower melting point to ~950°C.',
        'At Cathode (graphite lining): Al³⁺ + 3e⁻ ⟶ Al(l).',
        'Faraday\'s Law of Electrolysis: Mass deposited m = (M · I · t) / (n · F).'
      ],
      formulaDerived: '2Al₂O₃ ⟶ 4Al + 3O₂   |   m_Al = (M_Al · I · t) / (3 · F)',
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Electrode Half-Reactions',
          statement: 'In the electrolytic cell, Alumina dissociates into Al³⁺ and O²⁻ ions:\nCathode reaction (Reduction): 2Al³⁺ + 6e⁻ ⟶ 2Al(l)\nAnode reaction (Oxidation): 3O²⁻ ⟶ (3/2)O₂ + 6e⁻',
          mathEquation: 'Overall reaction: 2Al₂O₃(l) ⟶ 4Al(l) + 3O₂(g)',
          reasoning: 'Loss and gain of 6 electrons per mole of Al₂O₃ decomposed'
        },
        {
          stepNumber: 2,
          stepTitle: 'Anode Carbon Consumption Reaction',
          statement: 'The oxygen gas evolved at the high operating temperature (950°C) reacts with the graphite (carbon) anodes, burning them away as carbon dioxide gas:',
          mathEquation: 'C(s) + O₂(g) ⟶ CO₂(g)   and   2C(s) + O₂(g) ⟶ 2CO(g)',
          reasoning: 'Explains why graphite anode rods must be periodically replaced in aluminium smelters'
        },
        {
          stepNumber: 3,
          stepTitle: 'Theoretical Mass Calculation (Faraday\'s Law)',
          statement: 'To deposit 1 mole of Aluminium (atomic weight M = 27 g/mol), 3 moles of electrons (3 Faradays of charge = 3 × 96500 Coulombs) are required:',
          mathEquation: 'm = (M · Q) / (n · F) = (27 × I × t) / (3 × 96500) = (9 × I × t) / 96500 grams',
          reasoning: 'Where n = 3 is the valency of Aluminium'
        }
      ],
      finalBoxedResult: '2Al₂O₃ ⟶ 4Al + 3O₂   |   m_Al = (27 · I · t) / (3 · 96500) grams',
      physicalSignificance: 'Accounts for the heavy electrical energy consumption in aluminium manufacturing. Explains the purpose of cryolite (lowers melting point from 2050°C to 950°C and increases electrical conductivity).',
      topperTipOrWarning: 'Board question: "Why are the anodes in Hall-Héroult cell replaced from time to time?" Answer: The liberated oxygen oxidizes the carbon anodes to CO₂ gas, burning them out.'
    }
  ],

  'Carbon Compounds': [
    {
      id: 'carb-der-1',
      title: 'Derivation 1: General Molecular Formulas of Hydrocarbon Homologous Series (Alkanes, Alkenes, Alkynes)',
      marks: 3,
      boardReference: 'SSC Board March 2024 / Page 116',
      difficulty: 'High Weightage Derivation',
      aim: 'To mathematically derive the general formulas: Alkanes (C_n H_2n+2), Alkenes (C_n H_2n), and Alkynes (C_n H_2n-2), and prove that successive members differ by -CH₂- unit (14 u mass).',
      prerequisitesOrAssumptions: [
        'Carbon is tetravalent (valency = 4); Hydrogen is monovalent (valency = 1).',
        'In an open chain of n carbon atoms, each internal carbon uses 2 valencies for C-C bonding, leaving 2 valencies for H. The two terminal carbons have 1 extra free valency each.'
      ],
      formulaDerived: 'Alkanes: C_n H_{2n+2}   |   Alkenes: C_n H_{2n}   |   Alkynes: C_n H_{2n-2}   |   ΔM = 14 u',
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Derivation of Saturated Alkane Formula',
          statement: 'In an open alkane chain of n carbons connected by single covalent bonds (C-C):\nInternal carbons = (n - 2) carbons, each bonded to 2 hydrogens: 2(n - 2) H atoms.\nTwo end carbons = 2 carbons, each bonded to 3 hydrogens: 2 × 3 = 6 H atoms.\nTotal Hydrogens = 2(n - 2) + 6 = 2n - 4 + 6 = 2n + 2.',
          mathEquation: 'General Formula for Alkanes = C_n H_{2n+2}   (for n = 1, 2, 3...)',
          reasoning: 'Tetravalency of carbon satisfied purely by single bonds'
        },
        {
          stepNumber: 2,
          stepTitle: 'Derivation of Alkene Formula (One Double Bond C=C)',
          statement: 'Introducing one double bond (C=C) requires each of the two adjacent carbons to share an additional electron pair with each other instead of with Hydrogen, removing 2 H atoms:',
          mathEquation: 'Hydrogens = (2n + 2) - 2 = 2n  ⟹  General Formula for Alkenes = C_n H_{2n}   (n ≥ 2)',
          reasoning: 'Each degree of unsaturation removes 2 hydrogen atoms'
        },
        {
          stepNumber: 3,
          stepTitle: 'Derivation of Alkyne Formula (One Triple Bond C≡C)',
          statement: 'Introducing one triple bond (C≡C) requires two adjacent carbons to share 3 pairs of electrons, removing 4 H atoms relative to the saturated alkane:',
          mathEquation: 'Hydrogens = (2n + 2) - 4 = 2n - 2  ⟹  General Formula for Alkynes = C_n H_{2n-2}   (n ≥ 2)',
          reasoning: 'Triple bond removes 4 hydrogens'
        },
        {
          stepNumber: 4,
          stepTitle: 'Derivation of Constant Molecular Mass Difference (ΔM)',
          statement: 'Subtracting formula of n-th member from (n+1)-th member in any homologous series:\nDifference = C_{n+1}H_{2(n+1)+2} - C_n H_{2n+2} = C₁H₂ = -CH₂- unit.\nMolecular mass of -CH₂- = (1 × Atomic mass of C) + (2 × Atomic mass of H) = 12 + 2(1) = 14 u.',
          mathEquation: 'ΔM = 14 atomic mass units (u)',
          reasoning: 'All homologous series members differ by exactly one methylene (-CH₂-) group'
        }
      ],
      finalBoxedResult: 'Alkanes: C_n H_{2n+2}  |  Alkenes: C_n H_{2n}  |  Alkynes: C_n H_{2n-2}  |  ΔM = 14 u',
      physicalSignificance: 'Forms the foundational mathematical grammar of Organic Chemistry (IUPAC nomenclature). As molecular mass increases by 14 u, boiling point and melting point show a gradual gradation.',
      topperTipOrWarning: 'Remember that for Alkenes and Alkynes, n cannot be 1 because a double or triple bond requires at least 2 carbon atoms (smallest alkene is Ethene C₂H₄, smallest alkyne is Ethyne C₂H₂).'
    },
    {
      id: 'carb-der-2',
      title: 'Derivation 2: Stoichiometric Equation for Complete Combustion of Any Hydrocarbon',
      marks: 3,
      boardReference: 'SSC Board Model Question / Page 123',
      difficulty: 'Standard',
      aim: 'To derive the generalized balanced equation for the complete combustion of any hydrocarbon C_x H_y into CO₂ and H₂O.',
      prerequisitesOrAssumptions: [
        'Complete combustion in excess oxygen produces only Carbon Dioxide (CO₂) and Water (H₂O) along with heat and light.',
        'Hydrocarbon formula = C_x H_y.'
      ],
      formulaDerived: 'C_x H_y + [x + (y/4)] O₂ ⟶ x CO₂ + (y/2) H₂O + Heat & Light',
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Balance Carbon Atoms',
          statement: 'Reactant has x carbon atoms. Each CO₂ molecule contains 1 carbon atom, so x molecules of CO₂ are formed:',
          mathEquation: 'C_x H_y + ... ⟶ x CO₂ + ...',
          reasoning: 'Conservation of Carbon atoms'
        },
        {
          stepNumber: 2,
          stepTitle: 'Balance Hydrogen Atoms',
          statement: 'Reactant has y hydrogen atoms. Each H₂O molecule contains 2 hydrogen atoms, so (y/2) molecules of H₂O are formed:',
          mathEquation: 'C_x H_y + ... ⟶ x CO₂ + (y/2) H₂O',
          reasoning: 'Conservation of Hydrogen atoms'
        },
        {
          stepNumber: 3,
          stepTitle: 'Count Total Oxygen Atoms on Product Side',
          statement: 'From x CO₂: 2x oxygen atoms.\nFrom (y/2) H₂O: (y/2) oxygen atoms.\nTotal oxygen atoms required = 2x + (y/2).',
          mathEquation: 'Total O atoms = 2x + (y/2)',
          reasoning: 'Summation of oxygen in combustion products'
        },
        {
          stepNumber: 4,
          stepTitle: 'Determine Oxygen Molecules (O₂)',
          statement: 'Since each oxygen molecule is diatomic (O₂), divide total oxygen atoms by 2:',
          mathEquation: 'Molecules of O₂ = [2x + (y/2)] / 2 = x + (y/4)',
          reasoning: 'Molecular stoichiometry of O₂'
        },
        {
          stepNumber: 5,
          stepTitle: 'Verification for Methane (CH₄: x=1, y=4) & Propane (C₃H₈: x=3, y=8)',
          statement: 'For Methane: O₂ needed = 1 + 4/4 = 2 ⟹ CH₄ + 2O₂ ⟶ CO₂ + 2H₂O.\nFor Propane: O₂ needed = 3 + 8/4 = 5 ⟹ C₃H₈ + 5O₂ ⟶ 3CO₂ + 4H₂O.',
          mathEquation: 'C_x H_y + (x + y/4) O₂ ⟶ x CO₂ + (y/2) H₂O',
          reasoning: 'Perfect universal match for all hydrocarbons'
        }
      ],
      finalBoxedResult: 'C_x H_y + [x + (y/4)] O₂ ⟶ x CO₂ + (y/2) H₂O + Heat & Light',
      physicalSignificance: 'Used in designing domestic LPG burners, internal combustion engines, and rocket fuel oxidizer mixing ratios to ensure complete smokeless combustion.',
      topperTipOrWarning: 'If oxygen supply is limited, incomplete combustion occurs, producing toxic Carbon Monoxide (CO) and black soot (unburnt carbon).'
    }
  ],

  'Space Missions': [
    {
      id: 'space-der-1',
      title: 'Derivation 1: Critical (Orbital) Velocity of a Satellite (v_c = √[GM / (R+h)])',
      marks: 3,
      boardReference: 'SSC Board March 2024 / Page 137',
      difficulty: 'High Weightage Derivation',
      aim: 'To derive the mathematical expression for the critical velocity (v_c) required to put an artificial satellite of mass m into a stable circular orbit at height h above the Earth\'s surface.',
      prerequisitesOrAssumptions: [
        'Earth is a sphere of mass M and radius R.',
        'Satellite of mass m revolves in circular orbit at height h above Earth\'s surface.',
        'Orbital radius r = (R + h).',
        'The necessary centripetal force is provided entirely by the gravitational force between Earth and the satellite.'
      ],
      formulaDerived: 'v_c = √[ (G · M) / (R + h) ]   |   At Earth\'s surface (h ≈ 0): v_c = √(gR) ≈ 7.92 km/s',
      diagramTitle: 'Satellite Circular Orbit Equilibrium Diagram',
      diagramAsciiOrSteps: [
        'Center of Earth (O)',
        'Orbital radius r = R + h',
        'Centripetal force: F_c = m·v_c² / (R + h)',
        'Gravitational pull: F_g = G·M·m / (R + h)²',
        'Equilibrium condition: F_c = F_g'
      ],
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Centripetal Force on Satellite',
          statement: 'For a satellite to revolve in a stable circular orbit of radius r = (R + h) with critical velocity v_c, it requires an inward centripetal force:',
          mathEquation: 'F_c = (m · v_c²) / (R + h)',
          reasoning: 'Centripetal force equation for circular motion'
        },
        {
          stepNumber: 2,
          stepTitle: 'Gravitational Force of Attraction',
          statement: 'By Newton\'s Law of Gravitation, the attraction between Earth (M) and satellite (m) is:',
          mathEquation: 'F_g = (G · M · m) / (R + h)²',
          reasoning: 'Distance from satellite to Earth\'s center is (R + h)'
        },
        {
          stepNumber: 3,
          stepTitle: 'Equate Centripetal Force with Gravitational Force',
          statement: 'Equating F_c = F_g:',
          mathEquation: '(m · v_c²) / (R + h) = (G · M · m) / (R + h)²',
          reasoning: 'Gravitational force provides the required centripetal acceleration'
        },
        {
          stepNumber: 4,
          stepTitle: 'Cancel Common Factors',
          statement: 'Canceling mass of the satellite m from both sides and one factor of (R + h):',
          mathEquation: 'v_c² = (G · M) / (R + h)',
          reasoning: 'Simplification reveals v_c is independent of the satellite\'s mass'
        },
        {
          stepNumber: 5,
          stepTitle: 'Take Square Root',
          statement: 'Taking square root on both sides:',
          mathEquation: 'v_c = √[ (G · M) / (R + h) ]',
          reasoning: 'Formula for critical velocity'
        },
        {
          stepNumber: 6,
          stepTitle: 'In terms of Acceleration due to Gravity at Height h (g_h)',
          statement: 'Since g_h = (G · M) / (R + h)², we have G · M = g_h · (R + h)². Substituting G·M:',
          mathEquation: 'v_c = √[ g_h · (R + h)² / (R + h) ] = √[ g_h · (R + h) ]',
          reasoning: 'Alternative form using local acceleration due to gravity'
        }
      ],
      finalBoxedResult: 'v_c = √[ (G · M) / (R + h) ] = √[ g_h · (R + h) ]',
      physicalSignificance: 'Shows that critical velocity depends ONLY on the mass and radius of Earth and the altitude of the satellite (R+h). It is completely independent of the mass of the satellite! A 10 kg cubesat and a 10-ton space station require the exact same orbital speed at the same altitude.',
      topperTipOrWarning: 'Compare v_c with escape velocity: v_esc = √(2GM/R) = √2 · v_c ≈ 1.414 × v_c. If orbital velocity is boosted by ~41.4%, the satellite will permanently escape orbit!'
    },
    {
      id: 'space-der-2',
      title: 'Derivation 2: Periodic Time of a Satellite (T) & Derivation of Kepler\'s 3rd Law (T² ∝ r³)',
      marks: 3,
      boardReference: 'SSC Board July 2023 / Page 138',
      difficulty: 'High Weightage Derivation',
      aim: 'To derive the time period of revolution of a satellite: T = 2π(R+h) / v_c = [2π(R+h)³/²] / √(GM), and prove Kepler\'s 3rd Law T² ∝ r³.',
      prerequisitesOrAssumptions: [
        'Satellite moves in circular orbit of radius r = (R + h).',
        'Circumference of orbit = 2πr = 2π(R + h).',
        'Critical velocity v_c = √[GM / (R + h)].'
      ],
      formulaDerived: 'T = [2π · (R + h)³/²] / √(GM)   ⟹   T² ∝ (R + h)³ = r³',
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Time Period Equation',
          statement: 'Time taken for one complete revolution equals orbital circumference divided by orbital velocity:',
          mathEquation: 'T = (Distance in one revolution) / (Speed) = [2π · (R + h)] / v_c',
          reasoning: 'Definition of periodic time'
        },
        {
          stepNumber: 2,
          stepTitle: 'Substitute Critical Velocity v_c',
          statement: 'Substituting v_c = √[GM / (R + h)] into the time period equation:',
          mathEquation: 'T = [2π · (R + h)] / √[GM / (R + h)] = 2π · (R + h) · √[(R + h) / GM]',
          reasoning: 'Inverting the denominator radical'
        },
        {
          stepNumber: 3,
          stepTitle: 'Combine Radius Factors',
          statement: 'Taking (R + h) inside the square root as (R + h)²:',
          mathEquation: 'T = 2π · √[ (R + h)³ / (G · M) ]',
          reasoning: 'Algebraic consolidation under radical'
        },
        {
          stepNumber: 4,
          stepTitle: 'Square Both Sides to Prove Kepler\'s Third Law',
          statement: 'Squaring both sides:',
          mathEquation: 'T² = [4π² / (G · M)] · (R + h)³',
          reasoning: 'Since (4π² / GM) is a universal constant for Earth, T² ∝ (R + h)³ = r³'
        }
      ],
      finalBoxedResult: 'T = 2π · √[ (R + h)³ / (GM) ]   ⟹   T² ∝ r³',
      physicalSignificance: 'Proves that satellites in higher orbits take significantly longer to complete one revolution. For Low Earth Orbit (LEO: h = 300 km), T ≈ 90 minutes. For Geostationary Orbit (GEO: h = 35,786 km), T = exactly 24 hours!',
      topperTipOrWarning: 'Kepler\'s Third Law applies universally: not just to planets revolving around the Sun, but also to artificial satellites and moons revolving around any planet!'
    },
    {
      id: 'space-der-3',
      title: 'Derivation 3: Height of a Geostationary (Geosynchronous) Satellite Orbit (h ≈ 35,786 km)',
      marks: 3,
      boardReference: 'SSC Board Model Question / Page 139',
      difficulty: 'Standard',
      aim: 'To calculate the precise orbital height (h) required for a geostationary communications satellite so that its orbital period exactly matches Earth\'s rotation period (T = 24 hours = 86,400 s).',
      prerequisitesOrAssumptions: [
        'Geostationary satellite period T = 24 hours = 24 × 3600 = 86,400 seconds.',
        'Gravitational constant G = 6.67 × 10⁻¹¹ N·m²/kg².',
        'Mass of Earth M = 6.0 × 10²⁴ kg.',
        'Radius of Earth R = 6.4 × 10⁶ m (6400 km).'
      ],
      formulaDerived: 'h = [ (T² · G · M) / (4π²) ]¹/³ - R  ≈ 35,786 km ≈ 35,800 km',
      stepByStepDerivation: [
        {
          stepNumber: 1,
          stepTitle: 'Rearrange Kepler\'s Periodic Equation for (R + h)',
          statement: 'From T² = [4π² · (R + h)³] / (GM):',
          mathEquation: '(R + h)³ = (T² · G · M) / (4π²)',
          reasoning: 'Isolating the orbital radius term'
        },
        {
          stepNumber: 2,
          stepTitle: 'Take Cube Root',
          statement: 'Taking cube root on both sides:',
          mathEquation: 'R + h = [ (T² · G · M) / (4π²) ]¹/³',
          reasoning: 'Solving for orbital radius (R + h)'
        },
        {
          stepNumber: 3,
          stepTitle: 'Substitute Numerical Values',
          statement: 'T = 8.64 × 10⁴ s, G = 6.67 × 10⁻¹¹ N·m²/kg², M = 6.0 × 10²⁴ kg, π ≈ 3.1416:',
          mathEquation: 'R + h = [ (86400² × 6.67 × 10⁻¹¹ × 6.0 × 10²⁴) / (4 × 3.1416²) ]¹/³\n      ≈ [ 7.55 × 10²¹ ]¹/³ ≈ 4.22 × 10⁷ m = 42,200 km',
          reasoning: 'Distance from Earth\'s center to geostationary orbit is ~42,200 km'
        },
        {
          stepNumber: 4,
          stepTitle: 'Subtract Earth\'s Radius (R = 6400 km)',
          statement: 'Height h above Earth\'s surface:',
          mathEquation: 'h = (R + h) - R = 42,200 km - 6,400 km ≈ 35,800 km (exact: 35,786 km)',
          reasoning: 'Subtracting surface radius'
        }
      ],
      finalBoxedResult: 'h_geostationary ≈ 35,786 km ≈ 35,800 km above Equator',
      physicalSignificance: 'Because the satellite revolves in the equatorial plane from west to east with T = 24 hours, it appears permanently stationary over a fixed point on Earth. Ideal for TV broadcasting (DTH antennas like Tata Play / Dish TV stay fixed pointed at the same sky coordinates).',
      topperTipOrWarning: 'Always specify that a Geostationary satellite must orbit in the EQUATORIAL plane from WEST to EAST. If launched in a polar orbit, it cannot be geostationary!'
    }
  ]
};
