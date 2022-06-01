package main

import (
	"mermai-go/web"
	"net/http"
)

func main() {
	web.SetRouting(map[string]interface{}{
		"index": nil,
	})
	http.ListenAndServe(":8080", nil)
}
