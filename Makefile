protoc-auth:
	protoc -I . -I services/auth protos/proto_auth.proto --go_out=services/auth/gen/ --go_opt=paths=source_relative --go-grpc_out=services/auth/gen/ --go-grpc_opt=paths=source_relative --grpc-gateway_out=services/auth/gen --grpc-gateway_opt=paths=source_relative
protoc-user-manager:
	protoc -I . -I services/user_manager protos/proto_user_manager.proto --go_out=services/user_manager/gen/ --go_opt=paths=source_relative --go-grpc_out=services/user_manager/gen/ --go-grpc_opt=paths=source_relative --grpc-gateway_out=services/user_manager/gen --grpc-gateway_opt=paths=source_relative
protoc-organization-manager:
	protoc -I . -I services/organisation_manager protos/proto_organization_manager.proto --go_out=services/organisation_manager/gen/ --go_opt=paths=source_relative --go-grpc_out=services/organisation_manager/gen/ --go-grpc_opt=paths=source_relative --grpc-gateway_out=services/organisation_manager/gen --grpc-gateway_opt=paths=source_relative
migrator:
	go run .\migrator\migrator.go --UpOrDown=up