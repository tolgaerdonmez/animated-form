import React, { useState, useEffect } from "react";
import "../sass/Form.scss";

function Form() {
	const [strengthLevel, setStrengthLevel] = useState(0);
	const [strengths, setStrengths] = useState([...new Array(4)].map(() => 0));
	const [password, setPassword] = useState("");

	useEffect(() => {
		let s = [...new Array(4)].map(() => 0);
		if (password.length >= 5) {
			s[0] = 1;
		}
		if (password.search(/[A-Z]/) > -1) {
			s[1] = 1;
		}
		if (password.search(/[0-9]/) > -1) {
			s[2] = 1;
		}
		if (password.search(/(!|@|#|\$|,|\.|;|=|&|:|\*)/) > -1) {
			s[3] = 1;
		}
		setStrengths(s);
	}, [password]);

	useEffect(() => {
		let sLvl = 0;
		strengths.forEach(s => (s ? sLvl++ : null));
		setStrengthLevel(sLvl);
	}, [strengths]);

	return (
		<form onSubmit={e => e.preventDefault()}>
			<div className="field">
				<input type="email" name="Email" id="email" placeholder="" autoComplete="off" required />
				<label htmlFor="email">Email</label>
			</div>
			<div className="field">
				<input
					type="password"
					name="password"
					id="email"
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder=""
					autoComplete="off"
					required
				/>
				<label htmlFor="password">Password</label>
			</div>
			<ul className="strength">
				{[...new Array(4)].map((_, i) => (
					<li key={i} className={`sGrad0 ${strengthLevel > i ? `sGrad${i + 1}` : ""}`}></li>
				))}
			</ul>
			<br />
			<ul className="passwordRules">
				{/* ✅ */}
				<li>
					<span role="img" aria-label="crossmark">
						{strengths[0] ? "✅" : "❌"}
					</span>
					must be at least 5 characters
				</li>
				<li>
					<span role="img" aria-label="crossmark">
						{strengths[1] ? "✅" : "❌"}
					</span>
					must contain a capital letter
				</li>
				<li>
					<span role="img" aria-label="crossmark">
						{strengths[2] ? "✅" : "❌"}
					</span>
					must contain a number
				</li>
				<li>
					<span role="img" aria-label="crossmark">
						{strengths[3] ? "✅" : "❌"}
					</span>
					must contain one of !@#$,.;:=&*
				</li>
			</ul>
			<input type="submit" id="submitButton" value="Submit" disabled={strengthLevel >= 4 ? false : true} />
		</form>
	);
}

export default Form;
