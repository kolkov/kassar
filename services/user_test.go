package services

import (
	"kassar/models"
	"kassar/app"
	"testing"
	"github.com/stretchr/testify/assert"
)

func TestNewUserService(t *testing.T) {
	userDAO := newMockUserDAO()
	s := NewUserService(userDAO)
	assert.Equal(t, userDAO, s.dao)
}

func newMockUserDAO() userDAO {
	return &mockUserDAO{
		records: []models.User{
			{Id: 1},
			{Id: 2},
			{Id: 3},
		},
	}
}

type mockUserDAO struct {
	records []models.User
}

func (m *mockUserDAO) Get(rs app.RequestScope, id int) (*models.User, error) {
	return nil, nil
}
// Count returns the number of users.
func (m *mockUserDAO) Count(rs app.RequestScope) (int, error) {
	return len(m.records), nil
}
// Query returns the list of the users with the given offset and limit.
func (m *mockUserDAO) Query(rs app.RequestScope, offset, limit int) ([]models.User, error) {
	return nil, nil
}
// Create saves a new user in the storage.
func (m *mockUserDAO) Create(rs app.RequestScope, user *models.User) error {
	return nil
}
// Update updates the user with the given ID in the storage.
func (m *mockUserDAO) Update(rs app.RequestScope, id int, user *models.User) error {
	return nil
}
// Delete removes the user with the given ID from the storage.
func (m *mockUserDAO) Delete(rs app.RequestScope, id int) error {
	return nil
}
// Change password the user with the given ID from the storage.
func (m *mockUserDAO) ChangePassword(rs app.RequestScope, id int, oldPassword, newPassword string) error {
	return nil
}
