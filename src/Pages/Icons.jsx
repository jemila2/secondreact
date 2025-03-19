






import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Icons = () => {
    const [merchantId, setMerchantId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      
          const fetchMerchantId = async () => {
            try {
                const response = await axios.get('http://ecommerce.reworkstaging.name.ng/v2/your-correct-endpoint', {
                    headers: {
                        // Include necessary headers such as API key/token if needed
                        // 'Authorization': 'Bearer YOUR_API_KEY',
                    },
                });
        
                if (response.data && response.data.merchantId) {
                    setMerchantId(response.data.merchantId);
                } else {
                    throw new Error('Merchant ID not found in the response');
                }
            } catch (err) {
                setError(`Error fetching merchant ID: ${err.message}`);
                console.error(err);
            }
        };

        fetchMerchantId();
    }, []);

    return (
        <div>
            <h1>Merchant Dashboard</h1>
            {error && <p>{error}</p>}
            {merchantId ? (
                <div>
                    <h2>Your Merchant ID:</h2>
                    <p>{merchantId}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Icons;