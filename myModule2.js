
export default function (alpha) {
    // perhaps some initialization code?

    return {
        multiply(b) {
            return alpha * b;
        },
        divide(b) {
            return b / alpha;
        }
    };
}