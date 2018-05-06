/**
 * Created by Andrey Kolkov on 27.10.2016.
 */
package models

type News struct {
	Id      int    `json:"id"`
	Date    string `json:"date"`
	Heading string `json:"heading"`
	Body    string `json:"body"`
}
