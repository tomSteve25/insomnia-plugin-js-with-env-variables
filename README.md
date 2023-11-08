# Tag using JavaScript and Env Variables

## Install
* Go to `Insomnia` > `Application` > `Preferences` > `Plugins`
* Enter `insomnia-plugin-demo-example-js-with-env-variables` in the input field
* Click on `Install Plugin`

## Usage
* Add the environment variable you'd like to filter by (can be many)
* Create the second environment variable using a tag (`Ctrl + Space`) and select `JavaScript Tag with Env variables`
* Select the request (You will see the body displayed)
* Write the JavaScript
    * The syntax for referencing an environment variable is `${variableName}`

## Example
Lets say you had the following body:
```
{
	"response_code": 0,
	"results": [
		{
			"category": "General Knowledge",
			"type": "multiple",
			"difficulty": "hard",
			"question": "Which film star has his statue in Leicester Square?",
			"correct_answer": "Charlie Chaplin",
			"incorrect_answers": [
				"Paul Newman",
				"Rowan Atkinson ",
				"Alfred Hitchcock"
			]
		},
		{
			"category": "Entertainment: Film",
			"type": "multiple",
			"difficulty": "medium",
			"question": "Which former Star Trek actor directed Three Men and a Baby (1987)?",
			"correct_answer": "Leonard Nimoy",
			"incorrect_answers": [
				"William Shatner",
				"George Takei",
				"James Doohan"
			]
		}
	]
}
```
and you wanted to store the difficulty of the question with the category name of `General Knowledge`.
The JavaScript would look like:
```
(metadata, body) => JSON.parse(body).results.find((item) => {return item.category == ${category}}).difficulty
```