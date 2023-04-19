import './passwordStrengthIndicator.css'

const PasswordStrengthIndicator = ({validate: {minChar, number, specialChar}}) => {
    return (
        <div>
            <p>Password must contain:</p>
            <ul>
                <PasswordStrengthIndicatorItem isValid={minChar} text='Must be at least 8 characters'/>
                <PasswordStrengthIndicatorItem isValid={number} text='Must include at least 1 number'/>
                <PasswordStrengthIndicatorItem isValid={specialChar} text='Must include at least 1 special character'/>
            </ul>
        </div>
    )
}


const PasswordStrengthIndicatorItem = ({isValid, text}) => {
    const highlightClass = isValid ? "text-success" : isValid !== null ? "text-danger" : ""
    return <li className={highlightClass}>{text}</li>
}