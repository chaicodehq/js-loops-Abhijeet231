/**
 * 📱 Rohit ka Phone EMI Calculator
 *
 * Rohit ne naya phone liya hai EMI pe! Usse jaanna hai ki kitne months
 * lagenge phone ka poora paisa chukane mein. Har month interest lagta hai
 * remaining amount pe, aur phir EMI deduct hoti hai.
 *
 * Rules (use while loop):
 *   - Start with principal amount (remaining balance)
 *   - Each month:
 *     1. Calculate interest = remaining * monthlyRate (monthlyRate is like 0.02 for 2%)
 *     2. Add interest to remaining: remaining = remaining + interest
 *     3. Deduct EMI: remaining = remaining - emi
 *     4. Increment months count
 *     5. Add emi to totalPaid
 *   - Continue while remaining > 0
 *   - In the last month, if remaining < emi, just pay what's left
 *     (totalPaid += remaining before deduction, not full emi)
 *
 * Infinite loop protection:
 *   - Agar EMI <= first month's interest (principal * monthlyRate),
 *     toh loan kabhi khatam nahi hoga!
 *     Return: { months: -1, totalPaid: -1, totalInterest: -1 }
 *
 * Validation:
 *   - All three params must be positive numbers, else return
 *     { months: -1, totalPaid: -1, totalInterest: -1 }
 *
 * @param {number} principal - Loan amount (phone ki price)
 * @param {number} monthlyRate - Monthly interest rate (e.g., 0.02 for 2%)
 * @param {number} emi - Monthly EMI amount
 * @returns {{ months: number, totalPaid: number, totalInterest: number }}
 *
 * @example
 *   calculateEMI(10000, 0.01, 2000)
 *   // Month 1: 10000 + 100 = 10100, pay 2000, remaining = 8100
 *   // Month 2: 8100 + 81 = 8181, pay 2000, remaining = 6181
 *   // ... continues until remaining <= 0
 *
 *   calculateEMI(10000, 0.05, 400)
 *   // First month interest = 500, EMI = 400 < 500, INFINITE LOOP!
 *   // => { months: -1, totalPaid: -1, totalInterest: -1 }
 */
export function calculateEMI(principal, monthlyRate, emi) {

    // Validation
    if (principal <= 0 || monthlyRate < 0 || emi <= 0 || 
        isNaN(principal) || isNaN(monthlyRate) || isNaN(emi)) {
        return { months: -1, totalPaid: -1, totalInterest: -1 };
    }

    //  check for infinite loop condition
    const firstMonthInterest = principal * monthlyRate;
    if (emi <= firstMonthInterest) {
        return { months: -1, totalPaid: -1, totalInterest: -1 };
    }

    let remaining = principal;
    let months = 0;
    let totalPaid = 0;
    let totalInterest = 0;

    while (remaining > 0) {
        months++;

        //  Calculate interest on current remaining balance
        const interestThisMonth = remaining * monthlyRate;
        totalInterest += interestThisMonth;

        //  Add interest to remaining balance
        remaining += interestThisMonth;

        //  Decide how much to pay this month
        let paymentThisMonth;

        if (remaining < emi) {
            // Last month - pay only what's left
            paymentThisMonth = remaining;
        } else {
            // Normal month - pay full EMI
            paymentThisMonth = emi;
        }

        //  Deduct payment
        remaining -= paymentThisMonth;

        //Track total paid
        totalPaid += paymentThisMonth;

        // Safety: prevent potential infinite loop due to floating point issues
        if (months > 1200) { // max ~100 years
            return { months: -1, totalPaid: -1, totalInterest: -1 };
        }
    }

    // Round numbers to avoid floating point mess (2 decimal places)
    return {
        months: months,
        totalPaid: Number(totalPaid.toFixed(2)),
        totalInterest: Number(totalInterest.toFixed(2))
    };
}


