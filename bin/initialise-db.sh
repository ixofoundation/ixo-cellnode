curl -d "{
	\"jsonrpc\":\"2.0\", 
	\"method\":\"initPds\",
	\"id\": 123,
	\"params\": {\"payload\": {\"did\": \"did:ixo:1234567890\",
            			   \"request_type\": [{
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
            			   \"default_data\": [{
               						\"capability\": \"approve\"}]
							},
				\"signature\": {}
               }
}" -H "Content-Type: application/json" -X POST http://localhost:5000/api/init
