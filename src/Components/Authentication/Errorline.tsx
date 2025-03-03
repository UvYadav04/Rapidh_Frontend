import React from 'react'

const errors = [
    "Enter a valid email please.",
    "Enter a password please.",
    "Enter a name please.",
    "Password must be 8 length long.",
    "Password must contain lowercases, uppercases and digits.",
    "Confirm the password please.",
    "Invalid password or email.",
    "This email has already been registered.",
    "Fill all the columns.",
    "Passwords do not match.",
    "This email has already been registered",
    "No such email has been registered.",
    "Something went wrong."
]

function Errorline({ index }: { index: number }) {
    return (
        <p className={`text-red-500 -bottom-4 left-0 absolute text-[12px] `}>{errors[index]}</p>
    )
}

export default Errorline
