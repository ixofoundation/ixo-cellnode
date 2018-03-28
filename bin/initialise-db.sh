curl -d "{
	\"jsonrpc\":\"2.0\", 
	\"method\":\"initPds\",
	\"id\": 123,
	\"params\": {\"payload\": {\"request_type\": [{
               						\"type\": \"CreateProject\",
                                	\"template\": \"CreateProjectTemplate\"
              						},
									{
               						\"type\": \"CreateAgent\",
                                	\"template\": \"CreateAgentTemplate\"
              						},
              						{
               						\"type\": \"UpdateAgent\",
                                	\"template\": \"UpdateAgentTemplate\"
              						},
              						{
               						\"type\": \"SubmitClaim\",
                                	\"template\": \"SubmitClaimTemplate\"
              						},
              						{
               						\"type\": \"EvaluateClaim\",
                                	\"template\": \"EvaluateClaimTemplate\"
              						}],
            			   \"default_data\":  [{
               						\"capabilities\": [{
               							\"requestType\": \"CreatProject\",
               							\"allow\": \"did:ixo:*\"
               						},
               						{
               							\"requestType\": \"UpdateAgent\",
               							\"allow\": \"did:ixo:987654321\"
               						}
               						]}]
							},
				\"signature\": {}
               }
}" -H "Content-Type: application/json" -X POST http://localhost:5000/api/init
