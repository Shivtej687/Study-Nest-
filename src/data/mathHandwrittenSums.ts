export interface HandwrittenSum {
  id: string;
  title: string;
  marks: number;
  boardReference?: string;
  difficulty?: 'Standard' | 'Hot Sum (HOTS)' | 'Board Repeated';
  problemStatement: string;
  givenData?: string[];
  toFindOrProve: string;
  formulaUsed?: string[];
  stepByStepSolution: string[];
  roughWorkNotes?: string[];
  finalAnswer: string;
  examinerNote?: string;
}

export const MATH_HANDWRITTEN_SUMS: Record<string, HandwrittenSum[]> = {
  // =========================================================================
  // MATHS 1 (ALGEBRA)
  // =========================================================================

  'Linear Equations in Two Variables': [
    {
      id: 'lin-1',
      title: 'Sum 1: Cramer\'s Rule (Determinant Method)',
      marks: 3,
      boardReference: 'SSC Board March 2024 / July 2022',
      difficulty: 'Board Repeated',
      problemStatement: 'Solve the following simultaneous equations using Cramer\'s Rule:\n4m + 6n = 54\n3m + 2n = 28',
      givenData: [
        'Equation (1): 4m + 6n = 54',
        'Equation (2): 3m + 2n = 28'
      ],
      toFindOrProve: 'Values of variables m and n.',
      formulaUsed: [
        'D = |a₁  b₁| / |a₂  b₂| = a₁b₂ - a₂b₁',
        'Dm = |c₁  b₁| / |c₂  b₂| = c₁b₂ - c₂b₁',
        'Dn = |a₁  c₁| / |a₂  c₂| = a₁c₂ - a₂c₁',
        'By Cramer\'s Rule: m = Dm / D  and  n = Dn / D'
      ],
      stepByStepSolution: [
        'Step 1: Write equations in standard form a₁m + b₁n = c₁ and a₂m + b₂n = c₂.',
        'Comparing 4m + 6n = 54 and 3m + 2n = 28:\na₁ = 4, b₁ = 6, c₁ = 54\na₂ = 3, b₂ = 2, c₂ = 28',
        'Step 2: Calculate Determinant D:\nD = | 4   6 |\n    | 3   2 |\n  = (4 × 2) - (6 × 3)\n  = 8 - 18\n  = -10  (Since D = -10 ≠ 0, unique solution exists)',
        'Step 3: Calculate Determinant Dm (replace m-coefficients with constants c₁, c₂):\nDm = | 54   6 |\n     | 28   2 |\n   = (54 × 2) - (6 × 28)\n   = 108 - 168\n   = -60',
        'Step 4: Calculate Determinant Dn (replace n-coefficients with constants c₁, c₂):\nDn = | 4   54 |\n     | 3   28 |\n   = (4 × 28) - (54 × 3)\n   = 112 - 162\n   = -50',
        'Step 5: Apply Cramer\'s Rule:\nm = Dm / D = (-60) / (-10) = 6\nn = Dn / D = (-50) / (-10) = 5'
      ],
      roughWorkNotes: [
        '6 × 28 = 168',
        '54 × 3 = 162',
        'Check in Eq (2): 3(6) + 2(5) = 18 + 10 = 28 ✓ (Verified)'
      ],
      finalAnswer: 'The solution of the simultaneous equations is (m, n) = (6, 5).',
      examinerNote: 'Always state "Since D ≠ 0, Cramer\'s rule is applicable". Remember that minus divided by minus yields positive!'
    },
    {
      id: 'lin-2',
      title: 'Sum 2: Symmetric Interchanging Coefficients (Add & Subtract Method)',
      marks: 3,
      boardReference: 'SSC Board March 2023 / July 2020',
      difficulty: 'Board Repeated',
      problemStatement: 'Solve the following simultaneous equations:\n99x + 101y = 499\n101x + 99y = 501',
      givenData: [
        '99x + 101y = 499  ... (1)',
        '101x + 99y = 501  ... (2)'
      ],
      toFindOrProve: 'Values of x and y.',
      formulaUsed: [
        'When coefficients of x and y are interchanged, add the two equations to get (x + y), and subtract to get (x - y).'
      ],
      stepByStepSolution: [
        'Step 1: Adding equation (1) and equation (2):\n   99x + 101y = 499\n+ 101x +  99y = 501\n--------------------\n  200x + 200y = 1000',
        'Dividing throughout by 200:\nx + y = 5  ... (3)',
        'Step 2: Subtracting equation (1) from equation (2):\n   101x +  99y = 501\n - (99x + 101y = 499)\n--------------------\n     2x -   2y = 2',
        'Dividing throughout by 2:\nx - y = 1  ... (4)',
        'Step 3: Now adding equation (3) and equation (4):\n  x + y = 5\n+ x - y = 1\n------------\n     2x = 6\n      x = 6 / 2\n      x = 3',
        'Step 4: Substituting x = 3 in equation (3):\n3 + y = 5\ny = 5 - 3\ny = 2'
      ],
      roughWorkNotes: [
        '499 + 501 = 1000',
        '501 - 499 = 2',
        'Check in (1): 99(3) + 101(2) = 297 + 202 = 499 ✓'
      ],
      finalAnswer: 'Solution: (x, y) = (3, 2).',
      examinerNote: 'Never attempt direct cross-multiplication on large symmetric numbers like 99 and 101. The add-and-subtract technique saves 10 minutes.'
    },
    {
      id: 'lin-3',
      title: 'Sum 3: Fraction Word Problem (Algebraic Modeling)',
      marks: 4,
      boardReference: 'SSC Board Model Question / HOTS',
      difficulty: 'Hot Sum (HOTS)',
      problemStatement: 'The denominator of a fraction is 4 more than twice its numerator. If numerator and denominator are both decreased by 6, then the denominator becomes 12 times the numerator. Find the original fraction.',
      givenData: [
        'Let the numerator of the fraction be x and denominator be y.',
        'Original fraction = x / y.'
      ],
      toFindOrProve: 'Find the original fraction x / y.',
      formulaUsed: [
        'Form simultaneous linear equations from given conditions and solve for x and y.'
      ],
      stepByStepSolution: [
        'Step 1: First Condition:\nDenominator is 4 more than twice the numerator:\ny = 2x + 4\n∴ 2x - y = -4  ... (1)',
        'Step 2: Second Condition:\nWhen both are decreased by 6:\nNew numerator = (x - 6)\nNew denominator = (y - 6)\nGiven: (y - 6) = 12(x - 6)\ny - 6 = 12x - 72\n12x - y = -6 + 72\n12x - y = 66  ... (2)',
        'Step 3: Subtracting equation (1) from equation (2):\n  12x - y =  66\n- (2x - y = -4)\n-----------------\n      10x =  70\n        x =  70 / 10\n        x =  7',
        'Step 4: Substitute x = 7 in equation (1):\n2(7) - y = -4\n14 - y = -4\n-y = -4 - 14 = -18\ny = 18'
      ],
      roughWorkNotes: [
        'Check 1: Denominator y = 18 = 2(7) + 4 = 18 ✓',
        'Check 2: (18 - 6) = 12 = 12 × (7 - 6) = 12 × 1 = 12 ✓'
      ],
      finalAnswer: 'The required original fraction is 7 / 18.',
      examinerNote: 'Write the final answer in fractional form (7/18) and NOT just values of x and y separately, otherwise 1 mark is deducted!'
    }
  ],

  'Quadratic Equations': [
    {
      id: 'quad-1',
      title: 'Sum 1: Factorisation Method with Splitting the Middle Term',
      marks: 2,
      boardReference: 'SSC Board July 2023 / March 2020',
      difficulty: 'Standard',
      problemStatement: 'Solve the quadratic equation by factorisation:\n5m² = 22m + 15',
      givenData: [
        'Given equation: 5m² = 22m + 15'
      ],
      toFindOrProve: 'Roots of the quadratic equation.',
      formulaUsed: [
        'Standard form: ax² + bx + c = 0',
        'Product = a × c = 5 × (-15) = -75; Sum = b = -22'
      ],
      stepByStepSolution: [
        'Step 1: Write in standard form ax² + bx + c = 0:\n5m² - 22m - 15 = 0',
        'Step 2: Find two numbers whose product is 5 × (-15) = -75 and sum is -22.\nThe numbers are -25 and +3:\n(-25) × (+3) = -75\n(-25) + (+3) = -22',
        'Step 3: Split the middle term:\n5m² - 25m + 3m - 15 = 0',
        'Step 4: Take common terms:\n5m(m - 5) + 3(m - 5) = 0\n(m - 5)(5m + 3) = 0',
        'Step 5: Equate each factor to zero:\nm - 5 = 0   OR   5m + 3 = 0\nm = 5       OR   5m = -3 => m = -3/5'
      ],
      roughWorkNotes: [
        'Factors of 75: 1×75, 3×25, 5×15',
        'Difference 25 - 3 = 22 => choose -25 and +3'
      ],
      finalAnswer: 'The roots of the given quadratic equation are 5 and -3/5.',
      examinerNote: 'Do not forget the negative sign on -3/5. Write "OR" between the two root equations.'
    },
    {
      id: 'quad-2',
      title: 'Sum 2: Quadratic Formula Method (x = [-b ± √(b² - 4ac)] / 2a)',
      marks: 3,
      boardReference: 'SSC Board March 2024 / March 2022',
      difficulty: 'Board Repeated',
      problemStatement: 'Solve using formula method:\n2x² + 13x + 15 = 0',
      givenData: [
        '2x² + 13x + 15 = 0'
      ],
      toFindOrProve: 'Find roots of quadratic equation using formula.',
      formulaUsed: [
        'Discriminant: Δ = b² - 4ac',
        'Quadratic Formula: x = [-b ± √(b² - 4ac)] / (2a)'
      ],
      stepByStepSolution: [
        'Step 1: Comparing 2x² + 13x + 15 = 0 with ax² + bx + c = 0:\na = 2,  b = 13,  c = 15',
        'Step 2: Calculate Discriminant Δ = b² - 4ac:\nΔ = (13)² - 4(2)(15)\n  = 169 - 120\n  = 49',
        'Step 3: Since Δ = 49 > 0, roots are real and unequal.\n√Δ = √49 = 7',
        'Step 4: Substitute into quadratic formula:\nx = [-b ± √(b² - 4ac)] / (2a)\nx = [-13 ± 7] / (2 × 2)\nx = [-13 ± 7] / 4',
        'Step 5: Separate the two roots:\nx = (-13 + 7) / 4   OR   x = (-13 - 7) / 4\nx = -6 / 4          OR   x = -20 / 4\nx = -3 / 2          OR   x = -5'
      ],
      roughWorkNotes: [
        '4 × 2 × 15 = 120',
        '169 - 120 = 49',
        'Check: 2(-5)² + 13(-5) + 15 = 2(25) - 65 + 15 = 50 - 65 + 15 = 0 ✓'
      ],
      finalAnswer: 'The roots of the equation are -3/2 and -5.',
      examinerNote: 'Always reduce fractions to lowest terms: -6/4 must be written as -3/2.'
    },
    {
      id: 'quad-3',
      title: 'Sum 3: Word Problem on Consecutive Natural Numbers',
      marks: 4,
      boardReference: 'SSC Board March 2020 / HOTS',
      difficulty: 'Hot Sum (HOTS)',
      problemStatement: 'A natural number is greater than another natural number by 3. The sum of their squares is 117. Find the two natural numbers.',
      givenData: [
        'Two natural numbers differing by 3.',
        'Sum of their squares = 117.'
      ],
      toFindOrProve: 'Find the two natural numbers.',
      formulaUsed: [
        '(a + b)² = a² + 2ab + b²',
        'Natural numbers belong to N = {1, 2, 3, ...}'
      ],
      stepByStepSolution: [
        'Step 1: Let the smaller natural number be x.\nThen the greater natural number = x + 3.',
        'Step 2: According to the given condition:\nx² + (x + 3)² = 117\nx² + (x² + 6x + 9) = 117\n2x² + 6x + 9 - 117 = 0\n2x² + 6x - 108 = 0',
        'Step 3: Dividing the whole equation by 2:\nx² + 3x - 54 = 0',
        'Step 4: Factorise x² + 3x - 54 = 0:\nFind two numbers whose product is -54 and sum is +3 (Numbers are +9 and -6):\nx² + 9x - 6x - 54 = 0\nx(x + 9) - 6(x + 9) = 0\n(x + 9)(x - 6) = 0',
        'Step 5: Solve for x:\nx + 9 = 0   OR   x - 6 = 0\nx = -9      OR   x = 6',
        'Step 6: But x is a natural number (x ∈ N), and natural numbers cannot be negative.\n∴ x = -9 is unacceptable.\n∴ x = 6',
        'Step 7: The second natural number = x + 3 = 6 + 3 = 9.'
      ],
      roughWorkNotes: [
        '6² + 9² = 36 + 81 = 117 ✓ (Condition satisfied)'
      ],
      finalAnswer: 'The two required natural numbers are 6 and 9.',
      examinerNote: 'Crucial step: Explicitly write reason why x = -9 is discarded: "Because natural numbers are positive integers".'
    }
  ],

  'Arithmetic Progression': [
    {
      id: 'ap-1',
      title: 'Sum 1: Finding nth Term of an A.P. (t_n Formula)',
      marks: 2,
      boardReference: 'SSC Board July 2024 / March 2023',
      difficulty: 'Standard',
      problemStatement: 'Find the 19th term of the following A.P.:\n7, 13, 19, 25, ...',
      givenData: [
        'A.P.: 7, 13, 19, 25, ...',
        'First term a = t₁ = 7',
        'Common difference d = t₂ - t₁ = 13 - 7 = 6',
        'n = 19'
      ],
      toFindOrProve: 'Find 19th term (t₁₉).',
      formulaUsed: [
        't_n = a + (n - 1)d'
      ],
      stepByStepSolution: [
        'Step 1: Identify given terms:\na = 7,  d = 6,  n = 19',
        'Step 2: State the formula for nth term of an A.P.:\nt_n = a + (n - 1)d',
        'Step 3: Substitute the values:\nt₁₉ = 7 + (19 - 1) × 6\n    = 7 + 18 × 6\n    = 7 + 108\n    = 115'
      ],
      roughWorkNotes: [
        '18 × 6 = 108',
        '108 + 7 = 115'
      ],
      finalAnswer: 'The 19th term of the given A.P. (t₁₉) is 115.',
      examinerNote: 'Apply BODMAS: Multiply 18 × 6 first before adding 7!'
    },
    {
      id: 'ap-2',
      title: 'Sum 2: Sum of Odd Natural Numbers from 1 to 150 (S_n Formula)',
      marks: 3,
      boardReference: 'SSC Board March 2024',
      difficulty: 'Board Repeated',
      problemStatement: 'Find the sum of all odd natural numbers from 1 to 150.',
      givenData: [
        'Odd natural numbers from 1 to 150 are: 1, 3, 5, 7, ..., 149'
      ],
      toFindOrProve: 'Sum of all odd natural numbers from 1 to 150 (S_n).',
      formulaUsed: [
        't_n = a + (n - 1)d',
        'S_n = (n / 2) [t₁ + t_n]  OR  S_n = (n / 2)[2a + (n - 1)d]'
      ],
      stepByStepSolution: [
        'Step 1: The sequence of odd natural numbers is:\n1, 3, 5, 7, ..., 149\nHere, a = 1,  d = 3 - 1 = 2,  last term t_n = 149',
        'Step 2: Find total number of terms (n):\nt_n = a + (n - 1)d\n149 = 1 + (n - 1) × 2\n149 - 1 = 2(n - 1)\n148 = 2(n - 1)\n(n - 1) = 148 / 2 = 74\nn = 74 + 1 = 75',
        'Step 3: Find sum of these 75 terms using S_n formula:\nS_n = (n / 2) [first term + last term]\nS₇₅ = (75 / 2) [1 + 149]\n    = (75 / 2) [150]\n    = 75 × 75\n    = 5625'
      ],
      roughWorkNotes: [
        'Shortcut rule: Sum of first n odd numbers = n² = 75² = 5625 ✓',
        '75 × 75 = (7×8)25 = 5625'
      ],
      finalAnswer: 'The sum of all odd natural numbers from 1 to 150 is 5625.',
      examinerNote: 'Notice the wording "from 1 to 150": 1 is included. 149 is the last odd number. Do not confuse with "between 1 and 150".'
    },
    {
      id: 'ap-3',
      title: 'Sum 3: Finding 41st Term when 11th and 21st Terms are Given',
      marks: 4,
      boardReference: 'SSC Board March 2022 / July 2023',
      difficulty: 'Hot Sum (HOTS)',
      problemStatement: 'In an A.P., the 11th term is 16 and the 21st term is 29. Find the 41st term of that A.P.',
      givenData: [
        't₁₁ = 16',
        't₂₁ = 29'
      ],
      toFindOrProve: 'Find the 41st term (t₄₁).',
      formulaUsed: [
        't_n = a + (n - 1)d'
      ],
      stepByStepSolution: [
        'Step 1: Using t_n = a + (n - 1)d for 11th term:\nt₁₁ = a + (11 - 1)d = 16\na + 10d = 16  ... (1)',
        'Step 2: Using t_n formula for 21st term:\nt₂₁ = a + (21 - 1)d = 29\na + 20d = 29  ... (2)',
        'Step 3: Subtracting equation (1) from equation (2):\n  (a + 20d) - (a + 10d) = 29 - 16\n  10d = 13\n  d = 13 / 10 = 1.3',
        'Step 4: Substituting d = 1.3 in equation (1):\na + 10(1.3) = 16\na + 13 = 16\na = 16 - 13\na = 3',
        'Step 5: Now finding 41st term (t₄₁):\nt₄₁ = a + (41 - 1)d\n    = a + 40d\n    = 3 + 40(1.3)\n    = 3 + 52\n    = 55'
      ],
      roughWorkNotes: [
        '40 × 1.3 = 52',
        'Alternative shortcut: t₄₁ = t₂₁ + 20d = 29 + 20(1.3) = 29 + 26 = 55 ✓'
      ],
      finalAnswer: 'The 41st term of the A.P. is 55.',
      examinerNote: 'You can keep d as 13/10 or 1.3. Fractions often avoid rounding errors, so both methods are awarded full marks.'
    }
  ],

  'Financial Planning': [
    {
      id: 'fin-1',
      title: 'Sum 1: GST, CGST and SGST Calculation on Taxable Value',
      marks: 3,
      boardReference: 'SSC Board March 2024 / July 2023',
      difficulty: 'Standard',
      problemStatement: 'Pawan Medical supplies medicines. On a certain medicine, the rate of GST is 12%. What is the rate of CGST and SGST? If the taxable value of the medicine is ₹800, find the total amount of bill (Invoice value) charged to the customer.',
      givenData: [
        'Rate of GST = 12%',
        'Taxable value of medicine = ₹800'
      ],
      toFindOrProve: '1) Rate of CGST and SGST\n2) Total bill amount',
      formulaUsed: [
        'Rate of CGST = Rate of SGST = 1/2 × Rate of GST',
        'Amount of GST = Rate of GST × Taxable Value',
        'Total Bill Amount = Taxable Value + CGST + SGST (or Taxable Value + Total GST)'
      ],
      stepByStepSolution: [
        'Step 1: Find rate of CGST and SGST:\nRate of CGST = 1/2 × Rate of GST = 1/2 × 12% = 6%\nRate of SGST = 1/2 × Rate of GST = 1/2 × 12% = 6%',
        'Step 2: Calculate CGST Amount:\nCGST = 6% of ₹800\n     = (6 / 100) × 800\n     = 6 × 8 = ₹48',
        'Step 3: Calculate SGST Amount:\nSGST = 6% of ₹800\n     = (6 / 100) × 800\n     = ₹48',
        'Step 4: Total GST = CGST + SGST = 48 + 48 = ₹96',
        'Step 5: Calculate Total Bill Amount:\nTotal Amount = Taxable value + GST\n             = ₹800 + ₹96\n             = ₹896'
      ],
      roughWorkNotes: [
        '6 × 8 = 48',
        '800 + 48 + 48 = 896'
      ],
      finalAnswer: 'Rate of CGST = 6%, Rate of SGST = 6%, and Total Bill Amount = ₹896.',
      examinerNote: 'Always state that CGST and SGST are equal and each half of total GST.'
    },
    {
      id: 'fin-2',
      title: 'Sum 2: Share Trading, Brokerage & GST on Brokerage',
      marks: 3,
      boardReference: 'SSC Board March 2023',
      difficulty: 'Board Repeated',
      problemStatement: 'The market value of a share is ₹200. If the brokerage rate is 0.3% and GST on brokerage is 18%, find the purchase price of one share.',
      givenData: [
        'Market Value (MV) of 1 share = ₹200',
        'Brokerage rate = 0.3%',
        'GST rate on brokerage = 18%'
      ],
      toFindOrProve: 'Purchase price of one share.',
      formulaUsed: [
        'Brokerage per share = Brokerage% × MV',
        'GST on brokerage = 18% × Brokerage amount',
        'Purchase Price of 1 share = MV + Brokerage + GST on brokerage'
      ],
      stepByStepSolution: [
        'Step 1: Calculate Brokerage on 1 share:\nBrokerage = 0.3% of MV\n          = (0.3 / 100) × 200\n          = 0.3 × 2\n          = ₹0.60',
        'Step 2: Calculate GST on Brokerage (18% of brokerage):\nGST on Brokerage = 18% of ₹0.60\n                 = (18 / 100) × 0.60\n                 = 10.8 / 100\n                 = ₹0.108 ≈ ₹0.11',
        'Step 3: Calculate Purchase Price of 1 share:\nPurchase Price = MV + Brokerage + GST on Brokerage\n               = 200 + 0.60 + 0.108\n               = ₹200.708 (or ₹200.71)'
      ],
      roughWorkNotes: [
        '18 × 0.6 = 10.8',
        '10.8 / 100 = 0.108',
        '200 + 0.60 + 0.108 = 200.708'
      ],
      finalAnswer: 'The purchase price of one share is ₹200.71 (or ₹200.708).',
      examinerNote: 'Remember: When BUYING shares, Brokerage and GST are ADDED to Market Value. When SELLING shares, Brokerage and GST are SUBTRACTED!'
    }
  ],

  'Probability': [
    {
      id: 'prob-1',
      title: 'Sum 1: Two Dice Rolled Simultaneously',
      marks: 3,
      boardReference: 'SSC Board March 2024 / July 2022',
      difficulty: 'Board Repeated',
      problemStatement: 'Two dice are rolled simultaneously. Find the probability of the following events:\nEvent A: The sum of digits on the upper faces is a multiple of 5.\nEvent B: The digit on the first die is greater than the digit on the second die.',
      givenData: [
        'Random experiment: Two dice rolled simultaneously.'
      ],
      toFindOrProve: 'Find P(A) and P(B).',
      formulaUsed: [
        'P(E) = n(E) / n(S)'
      ],
      stepByStepSolution: [
        'Step 1: Write Sample Space (S):\nS = { (1,1), (1,2), (1,3), (1,4), (1,5), (1,6),\n      (2,1), (2,2), (2,3), (2,4), (2,5), (2,6),\n      (3,1), (3,2), (3,3), (3,4), (3,5), (3,6),\n      (4,1), (4,2), (4,3), (4,4), (4,5), (4,6),\n      (5,1), (5,2), (5,3), (5,4), (5,5), (5,6),\n      (6,1), (6,2), (6,3), (6,4), (6,5), (6,6) }\n∴ Total number of sample points n(S) = 36',
        'Step 2: Event A: Sum of digits is a multiple of 5 (sum = 5 or 10):\nA = { (1,4), (2,3), (3,2), (4,1), (4,6), (5,5), (6,4) }\n∴ n(A) = 7\n∴ P(A) = n(A) / n(S) = 7 / 36',
        'Step 3: Event B: First digit > Second digit:\nB = { (2,1),\n      (3,1), (3,2),\n      (4,1), (4,2), (4,3),\n      (5,1), (5,2), (5,3), (5,4),\n      (6,1), (6,2), (6,3), (6,4), (6,5) }\n∴ n(B) = 1 + 2 + 3 + 4 + 5 = 15\n∴ P(B) = n(B) / n(S) = 15 / 36 = 5 / 12'
      ],
      roughWorkNotes: [
        'Diagonal pairs (1,1)..(6,6) are 6 pairs where digits are equal.',
        'Remaining 30 pairs: 15 have 1st > 2nd, 15 have 2nd > 1st.',
        '15 / 36 divided by 3 = 5 / 12'
      ],
      finalAnswer: 'P(A) = 7/36  and  P(B) = 5/12.',
      examinerNote: 'Writing all 36 elements of S carries 1 full mark. Never skip writing sample space!'
    },
    {
      id: 'prob-2',
      title: 'Sum 2: Two-Digit Numbers Formed Without Repetition',
      marks: 3,
      boardReference: 'SSC Board March 2023',
      difficulty: 'Standard',
      problemStatement: 'A two-digit number is to be formed from the digits 0, 1, 2, 3, 4 without repetition. Find the probability of the events:\n1) The number formed is an even number.\n2) The number formed is a multiple of 4.',
      givenData: [
        'Available digits: 0, 1, 2, 3, 4 without repetition.',
        'A two digit number cannot have 0 in the tens place.'
      ],
      toFindOrProve: 'P(Even Number) and P(Multiple of 4).',
      formulaUsed: [
        'P(A) = n(A) / n(S)'
      ],
      stepByStepSolution: [
        'Step 1: Write Sample Space S:\nTens place can take 1, 2, 3, 4 (4 choices). Ones place can take remaining 4 digits.\nS = { 10, 12, 13, 14,\n      20, 21, 23, 24,\n      30, 31, 32, 34,\n      40, 41, 42, 43 }\n∴ n(S) = 16',
        'Step 2: Event A: Number formed is even (ends in 0, 2, 4):\nA = { 10, 12, 14, 20, 24, 30, 32, 34, 40, 42 }\n∴ n(A) = 10\n∴ P(A) = n(A) / n(S) = 10 / 16 = 5 / 8',
        'Step 3: Event B: Number formed is a multiple of 4:\nB = { 12, 20, 24, 32, 40 }\n∴ n(B) = 5\n∴ P(B) = n(B) / n(S) = 5 / 16'
      ],
      roughWorkNotes: [
        'Check multiples of 4 in set: 12, 20, 24, 32, 40 (Total 5 numbers) ✓'
      ],
      finalAnswer: 'P(Number is even) = 5/8  and  P(Multiple of 4) = 5/16.',
      examinerNote: '0 cannot be in tens place (e.g. 01, 02 are single digit numbers, not two digit numbers).'
    }
  ],

  'Statistics': [
    {
      id: 'stat-1',
      title: 'Sum 1: Finding Mean by Assumed Mean Method (di = xi - A)',
      marks: 4,
      boardReference: 'SSC Board March 2024 / July 2023',
      difficulty: 'Board Repeated',
      problemStatement: 'The following table shows the frequency distribution of daily wages (in ₹) of 50 workers in a factory. Find the mean wage using the Assumed Mean Method:\nClasses (₹): [200-240], [240-280], [280-320], [320-360], [360-400]\nFrequency (fi):    5,        10,       15,       12,        8',
      givenData: [
        'Total workers N = Σfi = 50'
      ],
      toFindOrProve: 'Mean daily wage using Assumed Mean Method.',
      formulaUsed: [
        'Class mark xi = (Lower limit + Upper limit) / 2',
        'Deviation di = xi - A  (Let Assumed Mean A = 300)',
        'd̄ = Σ(fi·di) / Σfi',
        'Mean X̄ = A + d̄'
      ],
      stepByStepSolution: [
        'Step 1: Construct the Assumed Mean Table:\nLet Assumed Mean A = 300 (class mark of 280-320).\n\nClass     | Class Mark (xi) | di = xi - 300 | fi | fi × di\n200-240   | 220             | -80           | 5  | -400\n240-280   | 260             | -40           | 10 | -400\n280-320   | 300 (A)         |   0           | 15 |    0\n320-360   | 340             | +40           | 12 | +480\n360-400   | 380             | +80           | 8  | +640\n------------------------------------------------------------\nTotal     |                 |               | 50 | Σfidi = +320',
        'Step 2: Calculate Σ(fi·di):\nNegative sum = -400 + (-400) = -800\nPositive sum = 0 + 480 + 640 = +1120\nΣ(fi·di) = 1120 - 800 = +320',
        'Step 3: Calculate mean deviation d̄:\nd̄ = Σ(fi·di) / Σfi = 320 / 50 = 6.4',
        'Step 4: Calculate Mean X̄:\nX̄ = A + d̄\n  = 300 + 6.4\n  = 306.4'
      ],
      roughWorkNotes: [
        '320 / 50 = 32 / 5 = 6.4',
        '300 + 6.4 = 306.40'
      ],
      finalAnswer: 'The mean daily wage of workers is ₹306.40.',
      examinerNote: 'Always write the final answer with appropriate monetary unit (₹).'
    },
    {
      id: 'stat-2',
      title: 'Sum 2: Median of Grouped Frequency Distribution',
      marks: 3,
      boardReference: 'SSC Board March 2023 / July 2022',
      difficulty: 'Standard',
      problemStatement: 'Find the median of the following frequency distribution:\nClass:     0-10, 10-20, 20-30, 30-40, 40-50\nFrequency:   4,    16,    30,    20,    10',
      givenData: [
        'Total frequency N = 80'
      ],
      toFindOrProve: 'Find the Median.',
      formulaUsed: [
        'Median = L + [ (N/2 - cf) / f ] × h',
        'L = Lower limit of median class',
        'cf = Cumulative frequency of preceding class',
        'f = Frequency of median class',
        'h = Class height'
      ],
      stepByStepSolution: [
        'Step 1: Calculate cumulative frequencies (cf):\nClass | fi | cf (less than type)\n0-10  | 4  | 4\n10-20 | 16 | 20\n20-30 | 30 | 50  <-- Median Class\n30-40 | 20 | 70\n40-50 | 10 | 80\nTotal N = 80',
        'Step 2: Identify Median Class:\nN / 2 = 80 / 2 = 40.\nThe cumulative frequency just greater than 40 is 50, which belongs to class 20-30.\n∴ Median Class is 20 - 30.',
        'Step 3: Values from Median Class:\nL = 20\ncf (of preceding class 10-20) = 20\nf (frequency of median class) = 30\nh = 30 - 20 = 10',
        'Step 4: Substitute into Median formula:\nMedian = L + [ (N/2 - cf) / f ] × h\n       = 20 + [ (40 - 20) / 30 ] × 10\n       = 20 + [ 20 / 30 ] × 10\n       = 20 + 200 / 30\n       = 20 + 6.67\n       = 26.67'
      ],
      roughWorkNotes: [
        '20 / 3 = 6.666... ≈ 6.67',
        '20 + 6.67 = 26.67 (Lies within class 20-30 ✓)'
      ],
      finalAnswer: 'The median of the given data is 26.67.',
      examinerNote: 'Sanity check: The calculated median 26.67 must lie within the median class [20, 30]. If it does not, you made a calculation error!'
    }
  ],

  // =========================================================================
  // MATHS 2 (GEOMETRY)
  // =========================================================================

  'Similarity': [
    {
      id: 'sim-1',
      title: 'Sum 1: Basic Proportionality Theorem (BPT) Direct Proof & Value',
      marks: 3,
      boardReference: 'SSC Board March 2024 / March 2022',
      difficulty: 'Board Repeated',
      problemStatement: 'In ΔABC, line DE is parallel to side BC (DE || BC), intersecting AB at D and AC at E. If AD = 1.8 cm, DB = 5.4 cm, and AE = 1.2 cm, find the length of EC.',
      givenData: [
        'In ΔABC, DE || BC',
        'AD = 1.8 cm, DB = 5.4 cm, AE = 1.2 cm'
      ],
      toFindOrProve: 'Find the length of segment EC.',
      formulaUsed: [
        'Basic Proportionality Theorem (BPT): If a line is drawn parallel to one side of a triangle intersecting the other two sides in distinct points, then it divides the other two sides in the same ratio: AD / DB = AE / EC'
      ],
      stepByStepSolution: [
        'Step 1: State given information and theorem:\nIn ΔABC, seg DE || side BC.\nBy Basic Proportionality Theorem (BPT):\nAD / DB = AE / EC',
        'Step 2: Substitute given numerical values:\n1.8 / 5.4 = 1.2 / EC',
        'Step 3: Simplify the left side fraction:\n1.8 / 5.4 = 18 / 54 = 1 / 3\n∴ 1 / 3 = 1.2 / EC',
        'Step 4: Cross multiply to solve for EC:\nEC × 1 = 1.2 × 3\nEC = 3.6 cm'
      ],
      roughWorkNotes: [
        '18 × 3 = 54 => 1.8 / 5.4 = 1/3',
        '1.2 × 3 = 3.6 cm'
      ],
      finalAnswer: 'The length of segment EC is 3.6 cm.',
      examinerNote: 'Writing the reason "[By Basic Proportionality Theorem]" carries 1 mark. Do not omit the geometrical reason.'
    },
    {
      id: 'sim-2',
      title: 'Sum 2: Theorem of Areas of Similar Triangles',
      marks: 3,
      boardReference: 'SSC Board July 2023 / March 2020',
      difficulty: 'Standard',
      problemStatement: 'The areas of two similar triangles are 225 sq.cm and 81 sq.cm. If the side of the smaller triangle is 12 cm, find the corresponding side of the bigger triangle.',
      givenData: [
        'Let Δ₁ and Δ₂ be two similar triangles such that Δ₁ ~ Δ₂.',
        'A(Δ₁) = 225 sq.cm (bigger triangle)',
        'A(Δ₂) = 81 sq.cm (smaller triangle)',
        'Side of smaller triangle s₂ = 12 cm'
      ],
      toFindOrProve: 'Find corresponding side s₁ of bigger triangle.',
      formulaUsed: [
        'Theorem of Areas of Similar Triangles: When two triangles are similar, the ratio of areas of those triangles is equal to the ratio of the squares of their corresponding sides: A(Δ₁) / A(Δ₂) = (s₁)² / (s₂)²'
      ],
      stepByStepSolution: [
        'Step 1: Given Δ₁ ~ Δ₂.\nBy the Theorem of Areas of Similar Triangles:\nA(Δ₁) / A(Δ₂) = (s₁)² / (s₂)²\n225 / 81 = (s₁)² / (12)²',
        'Step 2: Taking square root on both sides:\n√(225) / √(81) = s₁ / 12\n15 / 9 = s₁ / 12',
        'Step 3: Simplify 15 / 9 by dividing numerator and denominator by 3:\n5 / 3 = s₁ / 12',
        'Step 4: Solve for s₁ by cross multiplication:\n3 × s₁ = 5 × 12\n3 × s₁ = 60\ns₁ = 60 / 3 = 20 cm'
      ],
      roughWorkNotes: [
        '√225 = 15; √81 = 9',
        '(20/12)² = (5/3)² = 25/9 = 225/81 ✓'
      ],
      finalAnswer: 'The corresponding side of the bigger triangle is 20 cm.',
      examinerNote: 'Taking square roots FIRST is much faster than computing 12² = 144 and doing large multiplications.'
    },
    {
      id: 'sim-3',
      title: 'Sum 3: Property of Angle Bisector of a Triangle',
      marks: 3,
      boardReference: 'SSC Board March 2023',
      difficulty: 'Standard',
      problemStatement: 'In ΔPQR, seg QS is the bisector of ∠PQR. If PQ = 25, QR = 40, and PS = 15, find SR.',
      givenData: [
        'In ΔPQR, ray QS bisects ∠PQR',
        'PQ = 25, QR = 40, PS = 15'
      ],
      toFindOrProve: 'Find length of SR.',
      formulaUsed: [
        'Property of Angle Bisector of a Triangle: The bisector of an angle of a triangle divides the side opposite to the angle in the ratio of the remaining sides: PQ / QR = PS / SR'
      ],
      stepByStepSolution: [
        'Step 1: In ΔPQR, ray QS is the bisector of ∠PQR.\nBy Property of Angle Bisector of a triangle:\nPQ / QR = PS / SR',
        'Step 2: Substitute the values:\n25 / 40 = 15 / SR',
        'Step 3: Simplify 25 / 40 (divide by 5):\n5 / 8 = 15 / SR',
        'Step 4: Cross multiply:\n5 × SR = 8 × 15\n5 × SR = 120\nSR = 120 / 5\nSR = 24'
      ],
      roughWorkNotes: [
        '8 × 15 = 120',
        '120 / 5 = 24'
      ],
      finalAnswer: 'The length of SR is 24 units.',
      examinerNote: 'State the angle bisector property clearly. Mention the vertex ray correctly.'
    }
  ],

  'Pythagoras Theorem': [
    {
      id: 'pyth-1',
      title: 'Sum 1: Geometric Mean Property in a Right-Angled Triangle',
      marks: 3,
      boardReference: 'SSC Board March 2024 / July 2022',
      difficulty: 'Board Repeated',
      problemStatement: 'In ΔMNP, ∠MNP = 90°, seg NQ ⊥ seg MP, MQ = 9, and QP = 4. Find the length of seg NQ.',
      givenData: [
        'In ΔMNP, ∠MNP = 90°',
        'seg NQ ⊥ hypotenuse MP',
        'MQ = 9, QP = 4'
      ],
      toFindOrProve: 'Find length of NQ.',
      formulaUsed: [
        'Theorem of Geometric Mean: In a right-angled triangle, the perpendicular segment to the hypotenuse from the opposite vertex is the geometric mean of the segments into which the hypotenuse is divided: NQ² = MQ × QP'
      ],
      stepByStepSolution: [
        'Step 1: In right-angled triangle ΔMNP, seg NQ ⊥ hypotenuse MP.\nBy the Property of Geometric Mean:\nNQ² = MQ × QP',
        'Step 2: Substitute the given values:\nNQ² = 9 × 4\nNQ² = 36',
        'Step 3: Taking square root on both sides:\nNQ = √36\nNQ = 6'
      ],
      roughWorkNotes: [
        '√36 = 6'
      ],
      finalAnswer: 'The length of seg NQ is 6 units.',
      examinerNote: 'State clearly that NQ is the altitude drawn to the hypotenuse MP.'
    },
    {
      id: 'pyth-2',
      title: 'Sum 2: Apollonius Theorem (Median of a Triangle)',
      marks: 4,
      boardReference: 'SSC Board March 2023 / HOTS',
      difficulty: 'Hot Sum (HOTS)',
      problemStatement: 'In ΔPQR, point M is the midpoint of side QR. If PQ = 11, PR = 17, and QR = 12, find the length of median PM.',
      givenData: [
        'In ΔPQR, seg PM is a median (M is midpoint of QR)',
        'PQ = 11, PR = 17, QR = 12'
      ],
      toFindOrProve: 'Find the length of median PM.',
      formulaUsed: [
        'Apollonius Theorem: PQ² + PR² = 2PM² + 2QM²'
      ],
      stepByStepSolution: [
        'Step 1: Since point M is the midpoint of side QR:\nQM = MR = 1/2 × QR = 1/2 × 12 = 6',
        'Step 2: By Apollonius Theorem in ΔPQR:\nPQ² + PR² = 2PM² + 2QM²',
        'Step 3: Substitute the known values:\n(11)² + (17)² = 2PM² + 2(6)²\n121 + 289 = 2PM² + 2(36)\n410 = 2PM² + 72',
        'Step 4: Solve for PM:\n2PM² = 410 - 72\n2PM² = 338\nPM² = 338 / 2\nPM² = 169',
        'Step 5: Taking square root on both sides:\nPM = √169\nPM = 13'
      ],
      roughWorkNotes: [
        '11² = 121; 17² = 289; 121 + 289 = 410',
        '410 - 72 = 338; 338 / 2 = 169; √169 = 13'
      ],
      finalAnswer: 'The length of median PM is 13 units.',
      examinerNote: 'Apollonius theorem is applied ONLY when a median is involved. Do not confuse with angle bisector property.'
    }
  ],

  'Circle': [
    {
      id: 'circ-1',
      title: 'Sum 1: Tangent Segments Drawn from an External Point are Congruent',
      marks: 3,
      boardReference: 'SSC Board March 2024 / March 2020',
      difficulty: 'Board Repeated',
      problemStatement: 'In the figure, circles with center O has tangents PA and PB drawn from an external point P touching the circle at A and B respectively. If radius r = 5 cm and distance of point P from center OP = 13 cm, find the length of each tangent segment PA and PB.',
      givenData: [
        'Radius OA = OB = 5 cm',
        'Distance OP = 13 cm',
        'PA and PB are tangent segments'
      ],
      toFindOrProve: 'Length of tangent segments PA and PB.',
      formulaUsed: [
        'Tangent Theorem: Radius is perpendicular to tangent at point of contact: ∠OAP = 90°',
        'Pythagoras Theorem: In right ΔOAP, OP² = OA² + PA²',
        'Tangent Segments Theorem: PA = PB'
      ],
      stepByStepSolution: [
        'Step 1: seg OA is radius and line PA is tangent at point of contact A.\n∴ seg OA ⊥ line PA  [By Tangent Theorem]\n∴ ∠OAP = 90°',
        'Step 2: In right-angled triangle ΔOAP, by Pythagoras Theorem:\nOP² = OA² + PA²\n(13)² = (5)² + PA²\n169 = 25 + PA²',
        'Step 3: Solve for PA²:\nPA² = 169 - 25 = 144\nTaking square root on both sides:\nPA = √144 = 12 cm',
        'Step 4: By Tangent Segments Theorem:\nThe lengths of tangent segments drawn from an external point to a circle are equal:\n∴ PB = PA = 12 cm'
      ],
      roughWorkNotes: [
        'Pythagorean triplet: (5, 12, 13) ✓'
      ],
      finalAnswer: 'The length of each tangent segment PA and PB is 12 cm.',
      examinerNote: 'Always state that OA ⊥ PA by Tangent Theorem to establish the 90° angle before applying Pythagoras Theorem.'
    },
    {
      id: 'circ-2',
      title: 'Sum 2: Opposite Angles of a Cyclic Quadrilateral are Supplementary',
      marks: 3,
      boardReference: 'SSC Board July 2023 / March 2022',
      difficulty: 'Standard',
      problemStatement: 'Quadrilateral ABCD is cyclic. If ∠A = (2x + 4)° and ∠C = (3x - 24)°, find the measures of ∠A and ∠C.',
      givenData: [
        'Quadrilateral ABCD is cyclic',
        '∠A = (2x + 4)° and ∠C = (3x - 24)°'
      ],
      toFindOrProve: 'Find measures of ∠A and ∠C.',
      formulaUsed: [
        'Theorem of Cyclic Quadrilateral: Opposite angles of a cyclic quadrilateral are supplementary: ∠A + ∠C = 180°'
      ],
      stepByStepSolution: [
        'Step 1: Since ABCD is a cyclic quadrilateral, its opposite angles are supplementary.\n∴ ∠A + ∠C = 180°  [Theorem of Cyclic Quadrilateral]',
        'Step 2: Substitute the expressions in terms of x:\n(2x + 4) + (3x - 24) = 180\n5x - 20 = 180',
        'Step 3: Solve for x:\n5x = 180 + 20\n5x = 200\nx = 200 / 5\nx = 40',
        'Step 4: Calculate ∠A and ∠C:\n∠A = 2x + 4 = 2(40) + 4 = 80 + 4 = 84°\n∠C = 3x - 24 = 3(40) - 24 = 120 - 24 = 96°'
      ],
      roughWorkNotes: [
        'Check sum: 84° + 96° = 180° ✓ (Supplementary verified)'
      ],
      finalAnswer: 'Measure of ∠A = 84° and measure of ∠C = 96°.',
      examinerNote: 'Remember to calculate the actual angle measures in degrees, not just the value of x.'
    }
  ],

  'Geometric Constructions': [
    {
      id: 'const-1',
      title: 'Sum 1: Constructing Tangent to a Circle at a Point Without Using Center',
      marks: 3,
      boardReference: 'SSC Board March 2024 / July 2023',
      difficulty: 'Board Repeated',
      problemStatement: 'Draw a circle of radius 3.5 cm. Take any point P on the circle. Draw a tangent to the circle at point P without using the center of the circle.',
      givenData: [
        'Radius r = 3.5 cm',
        'Point P lies on the circle',
        'Condition: Do NOT use the center of the circle.'
      ],
      toFindOrProve: 'Construct tangent at P using Inscribed Angle / Alternate Segment method.',
      formulaUsed: [
        'Converse of Tangent-Secant Theorem / Alternate Segment Property: Angle between tangent and chord equals the angle subtended by the chord in the alternate segment.'
      ],
      stepByStepSolution: [
        'Step 1: Analytical Rough Figure:\nDraw a rough circle with chord PQ and triangle PQR inscribed in it. Tangent at P makes an angle equal to ∠PRQ.',
        'Step 2: Fair Construction Steps:\n1) Draw a circle of radius 3.5 cm with any compass setting.',
        '2) Mark a point P on the circumference of the circle.',
        '3) Draw any chord PQ through point P.',
        '4) Choose any point R on the major arc QP and join RQ and RP to form triangle ΔPQR.',
        '5) With vertex R as center and any convenient radius, draw an arc intersecting sides RQ and RP at points A and B.',
        '6) With the same radius and center P, draw an arc intersecting chord PQ at point C on the opposite side of R.',
        '7) Measure the distance AB with the compass. With center C, cut the previously drawn arc at point D.',
        '8) Draw a straight line passing through point P and point D. Line PD is the required tangent to the circle at P without using the center.'
      ],
      roughWorkNotes: [
        'Verification: ∠DPQ = ∠PRQ (Angles in alternate segment are equal)'
      ],
      finalAnswer: 'Line PD is the required tangent to the circle at point P without using the center.',
      examinerNote: 'Rough sketch with labels carries 1 mark! Sharp arcs and clean single-stroke lines are essential.'
    }
  ],

  'Co-ordinate Geometry': [
    {
      id: 'coord-1',
      title: 'Sum 1: Distance Formula d(P, Q) = √[(x₂ - x₁)² + (y₂ - y₁)²]',
      marks: 2,
      boardReference: 'SSC Board March 2024 / March 2022',
      difficulty: 'Standard',
      problemStatement: 'Find the distance between the points P(-5, 7) and Q(-1, 3).',
      givenData: [
        'P(x₁, y₁) = (-5, 7) => x₁ = -5, y₁ = 7',
        'Q(x₂, y₂) = (-1, 3) => x₂ = -1, y₂ = 3'
      ],
      toFindOrProve: 'Find distance d(P, Q).',
      formulaUsed: [
        'Distance Formula: d(P, Q) = √[ (x₂ - x₁)² + (y₂ - y₁)² ]'
      ],
      stepByStepSolution: [
        'Step 1: By Distance Formula:\nd(P, Q) = √[ (x₂ - x₁)² + (y₂ - y₁)² ]',
        'Step 2: Substitute coordinates:\nd(P, Q) = √[ (-1 - (-5))² + (3 - 7)² ]\n        = √[ (-1 + 5)² + (-4)² ]\n        = √[ (4)² + (16) ]\n        = √[ 16 + 16 ]\n        = √32',
        'Step 3: Simplify square root:\n√32 = √(16 × 2) = 4√2'
      ],
      roughWorkNotes: [
        '-1 - (-5) = -1 + 5 = 4',
        '4² = 16; (-4)² = 16',
        '16 + 16 = 32 = 16 × 2'
      ],
      finalAnswer: 'Distance d(P, Q) = 4√2 units.',
      examinerNote: 'Be extremely careful with double negatives: -1 - (-5) = +4. Writing units is mandatory.'
    },
    {
      id: 'coord-2',
      title: 'Sum 2: Section Formula for Internal Division',
      marks: 3,
      boardReference: 'SSC Board March 2023 / July 2022',
      difficulty: 'Board Repeated',
      problemStatement: 'Find the coordinates of point P which divides the line segment joining A(-1, 7) and B(4, -3) in the ratio 2 : 3.',
      givenData: [
        'A(x₁, y₁) = (-1, 7)',
        'B(x₂, y₂) = (4, -3)',
        'Ratio m : n = 2 : 3'
      ],
      toFindOrProve: 'Find coordinates of point P(x, y).',
      formulaUsed: [
        'Section Formula: x = (m·x₂ + n·x₁) / (m + n)  and  y = (m·y₂ + n·y₁) / (m + n)'
      ],
      stepByStepSolution: [
        'Step 1: Identify coordinates and ratio:\nx₁ = -1,  y₁ = 7\nx₂ = 4,   y₂ = -3\nm = 2,    n = 3',
        'Step 2: Apply Section Formula for x-coordinate:\nx = (m·x₂ + n·x₁) / (m + n)\n  = [ 2(4) + 3(-1) ] / (2 + 3)\n  = [ 8 - 3 ] / 5\n  = 5 / 5\n  = 1',
        'Step 3: Apply Section Formula for y-coordinate:\ny = (m·y₂ + n·y₁) / (m + n)\n  = [ 2(-3) + 3(7) ] / (2 + 3)\n  = [ -6 + 21 ] / 5\n  = 15 / 5\n  = 3'
      ],
      roughWorkNotes: [
        '2(4) = 8; 3(-1) = -3; 8 - 3 = 5',
        '2(-3) = -6; 3(7) = 21; 21 - 6 = 15'
      ],
      finalAnswer: 'The coordinates of point P are (1, 3).',
      examinerNote: 'Remember: m is multiplied with x₂ and n is multiplied with x₁ (cross-pattern).'
    }
  ],

  'Trigonometry': [
    {
      id: 'trig-1',
      title: 'Sum 1: Finding cos θ and tan θ when sin θ is Given',
      marks: 3,
      boardReference: 'SSC Board March 2024 / March 2022',
      difficulty: 'Standard',
      problemStatement: 'If sin θ = 7 / 25, find the values of cos θ and tan θ using fundamental trigonometric identities.',
      givenData: [
        'sin θ = 7 / 25',
        'θ is an acute angle'
      ],
      toFindOrProve: 'Find cos θ and tan θ.',
      formulaUsed: [
        'Fundamental identity: sin²θ + cos²θ = 1',
        'cos θ = √(1 - sin²θ)',
        'tan θ = sin θ / cos θ'
      ],
      stepByStepSolution: [
        'Step 1: Use fundamental identity:\nsin²θ + cos²θ = 1\n(7 / 25)² + cos²θ = 1\n49 / 625 + cos²θ = 1',
        'Step 2: Solve for cos²θ:\ncos²θ = 1 - 49 / 625\n      = (625 - 49) / 625\n      = 576 / 625',
        'Step 3: Taking square root on both sides:\ncos θ = √(576 / 625) = 24 / 25',
        'Step 4: Find tan θ:\ntan θ = sin θ / cos θ\n      = (7 / 25) / (24 / 25)\n      = 7 / 24'
      ],
      roughWorkNotes: [
        '25² = 625; 7² = 49; 625 - 49 = 576; √576 = 24',
        'Check triplet: (7, 24, 25) ✓'
      ],
      finalAnswer: 'cos θ = 24/25  and  tan θ = 7/24.',
      examinerNote: 'If question specifically asks "using identities", do not use triangle Pythagoras method, or marks will be deducted!'
    },
    {
      id: 'trig-2',
      title: 'Sum 2: Proving Trigonometric Identity',
      marks: 3,
      boardReference: 'SSC Board July 2023 / March 2020',
      difficulty: 'Board Repeated',
      problemStatement: 'Prove that:\n(sec θ - cos θ)(cot θ + tan θ) = tan θ · sec θ',
      givenData: [
        'L.H.S. = (sec θ - cos θ)(cot θ + tan θ)'
      ],
      toFindOrProve: 'Prove L.H.S. = R.H.S.',
      formulaUsed: [
        'sec θ = 1 / cos θ,  tan θ = sin θ / cos θ,  cot θ = cos θ / sin θ',
        '1 - cos²θ = sin²θ  and  sin²θ + cos²θ = 1'
      ],
      stepByStepSolution: [
        'Step 1: Write L.H.S.:\nL.H.S. = (sec θ - cos θ)(cot θ + tan θ)',
        'Step 2: Convert into terms of sin θ and cos θ:\n= (1 / cos θ - cos θ) × (cos θ / sin θ + sin θ / cos θ)\n= [ (1 - cos²θ) / cos θ ] × [ (cos²θ + sin²θ) / (sin θ · cos θ) ]',
        'Step 3: Apply fundamental identities:\nSince 1 - cos²θ = sin²θ and sin²θ + cos²θ = 1:\n= [ sin²θ / cos θ ] × [ 1 / (sin θ · cos θ) ]',
        'Step 4: Simplify by canceling one sin θ:\n= (sin²θ × 1) / (cos θ × sin θ × cos θ)\n= sin θ / (cos θ × cos θ)\n= (sin θ / cos θ) × (1 / cos θ)\n= tan θ · sec θ\n= R.H.S.',
        'Step 5: Conclusion:\n∴ L.H.S. = R.H.S.\nHence proved.'
      ],
      roughWorkNotes: [
        '(sin θ / cos θ) = tan θ',
        '(1 / cos θ) = sec θ'
      ],
      finalAnswer: 'L.H.S. = R.H.S. Hence, (sec θ - cos θ)(cot θ + tan θ) = tan θ · sec θ is proved.',
      examinerNote: 'Write reason brackets for every identity conversion: "[Since 1 - cos²θ = sin²θ]".'
    },
    {
      id: 'trig-3',
      title: 'Sum 3: Heights and Distances Word Problem (Angle of Elevation)',
      marks: 4,
      boardReference: 'SSC Board March 2024 / HOTS',
      difficulty: 'Hot Sum (HOTS)',
      problemStatement: 'An observer standing at a distance of 80 m from a church looks at the top of the church. The angle of elevation is 45°. Find the height of the church.',
      givenData: [
        'Distance of observer from church foot BC = 80 m',
        'Angle of elevation ∠ACB = 45°',
        'Let AB be height of church, ∠ABC = 90°'
      ],
      toFindOrProve: 'Find height of church AB.',
      formulaUsed: [
        'tan θ = Opposite side / Adjacent side = AB / BC'
      ],
      stepByStepSolution: [
        'Step 1: Draw figure:\nLet AB represent the church with foot at B, so ∠B = 90°.\nPoint C represents the position of the observer.\nGiven distance BC = 80 m.\nAngle of elevation ∠ACB = 45°.',
        'Step 2: In right-angled triangle ΔABC:\ntan 45° = AB / BC',
        'Step 3: Since tan 45° = 1:\n1 = AB / 80',
        'Step 4: Cross multiply:\nAB = 80 × 1\nAB = 80 m'
      ],
      roughWorkNotes: [
        'tan 45° = 1, so in 45-45-90 triangle, both perpendicular legs are equal.'
      ],
      finalAnswer: 'The height of the church is 80 meters.',
      examinerNote: 'Drawing the labeled right triangle diagram with angle of elevation carries 1 mark.'
    }
  ],

  'Mensuration': [
    {
      id: 'mens-1',
      title: 'Sum 1: Combined Solid Surface Area (Cylinder Surmounted by Cone)',
      marks: 4,
      boardReference: 'SSC Board March 2024 / July 2022',
      difficulty: 'Board Repeated',
      problemStatement: 'A solid toy is in the form of a cylinder of radius 7 cm and height 10 cm, surmounted by a cone of the same radius. If the slant height of the cone is 25 cm, find the total surface area of the toy (Take π = 22/7).',
      givenData: [
        'Radius of base r = 7 cm',
        'Height of cylinder h = 10 cm',
        'Slant height of cone l = 25 cm',
        'π = 22 / 7'
      ],
      toFindOrProve: 'Total surface area of the combined solid toy.',
      formulaUsed: [
        'Curved surface area of cone = π · r · l',
        'Curved surface area of cylinder = 2 · π · r · h',
        'Area of circular base = π · r²',
        'Total Surface Area = CSA of cone + CSA of cylinder + Area of flat base'
      ],
      stepByStepSolution: [
        'Step 1: Total Surface Area of the toy consists of:\nTSA = (Curved surface area of cone) + (Curved surface area of cylinder) + (Area of circular base)\nTSA = πrl + 2πrh + πr²',
        'Step 2: Take common factor πr:\nTSA = πr(l + 2h + r)',
        'Step 3: Substitute given numerical values:\nTSA = (22 / 7) × 7 × [ 25 + 2(10) + 7 ]\n    = 22 × [ 25 + 20 + 7 ]\n    = 22 × [ 52 ]\n    = 1144 sq.cm'
      ],
      roughWorkNotes: [
        '25 + 20 + 7 = 52',
        '52 × 22 = 52 × (20 + 2) = 1040 + 104 = 1144'
      ],
      finalAnswer: 'The total surface area of the toy is 1144 cm² (sq.cm).',
      examinerNote: 'Do not add the overlapping junction circle between cone and cylinder, as it is inside the solid toy!'
    },
    {
      id: 'mens-2',
      title: 'Sum 2: Length of Arc and Area of Sector',
      marks: 3,
      boardReference: 'SSC Board March 2023',
      difficulty: 'Standard',
      problemStatement: 'The measure of an arc of a circle is 80° and its radius is 18 cm. Find the length of the arc and area of the minor sector (Take π = 3.14).',
      givenData: [
        'Measure of arc θ = 80°',
        'Radius r = 18 cm',
        'π = 3.14'
      ],
      toFindOrProve: '1) Length of arc (l)\n2) Area of sector A(sector)',
      formulaUsed: [
        'Length of arc: l = (θ / 360) × 2πr',
        'Area of sector: A = (θ / 360) × πr²  OR  A = (l × r) / 2'
      ],
      stepByStepSolution: [
        'Step 1: Calculate Length of Arc l:\nl = (θ / 360) × 2πr\n  = (80 / 360) × 2 × 3.14 × 18\n  = (2 / 9) × 2 × 3.14 × 18',
        'Step 2: Simplify (18 / 9 = 2):\nl = 2 × 2 × 3.14 × 2\n  = 8 × 3.14\n  = 25.12 cm',
        'Step 3: Calculate Area of Sector:\nA = (l × r) / 2\n  = (25.12 × 18) / 2\n  = 25.12 × 9\n  = 226.08 sq.cm'
      ],
      roughWorkNotes: [
        '80/360 = 8/36 = 2/9',
        '2 × 2 × 2 = 8; 8 × 3.14 = 25.12',
        '25.12 × 9 = 226.08'
      ],
      finalAnswer: 'Length of the arc = 25.12 cm and Area of sector = 226.08 cm².',
      examinerNote: 'Take π = 3.14 as specified in the problem statement. Using 22/7 will alter decimal precision.'
    }
  ]
};
