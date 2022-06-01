package web

import (
	"html/template"
	"net/http"
)

func render(w http.ResponseWriter, temp string, args interface{}) {
	parsed, err := template.ParseFiles("static/" + temp + ".html")
	if err != nil {
		panic(err)
	}
	if err := parsed.Execute(w, args); err != nil {
		panic(err)
	}
}
