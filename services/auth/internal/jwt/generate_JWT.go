package auth_jwt

import (
	"os"
	"system_of_monitoring_statistics/models"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWT(user models.User, tokenTTL time.Duration) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)

	claims["id"] = user.UserID
	claims["exp"] = time.Now().Add(tokenTTL).Unix()
	claims["iat"] = time.Now().Unix()

	secretKey := os.Getenv("SECRET")
	signedToken, errSignedToken := token.SignedString([]byte(secretKey))
	if errSignedToken != nil {
		return signedToken, errSignedToken
	}

	return signedToken, nil
}
