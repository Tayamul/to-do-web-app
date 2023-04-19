import './passwordStrengthIndicator.css'

const PasswordStrengthIndicator = ({validate: {minChar, number, specialChar}}) => {
    return (
        <div>
            <p>Password must contain:</p>
            <ul>

            </ul>
        </div>
    )
}


const PasswordStrengthIndicatorItem = () => {
    const highlightClass = isValid ? "text-success" : isValid !== null ? "text-danger" : ""
    return <li className={highlightClass}>{text}</li>
}