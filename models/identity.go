/**
 * Created by Andrey Kolkov on 19.11.2016.
 */
package models

type Identity interface {
	GetID() string
	GetName() string
	GetLastLogin() string
}
