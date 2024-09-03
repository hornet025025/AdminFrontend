import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddProfitLoss.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { applyProfitLoss, resetProfitLossReducer } from '../../action/AddProfitLossAction';
import { Button, Container, Typography } from '@mui/material';

const AddProfitLoss = () => {
    const [tradeCategory, setTradeCategory] = useState('');
    const [profitLoss, setProfitLoss] = useState(''); 
    const [percentage, setPercentage] = useState(''); 
    const dispatch = useDispatch();
    const { successMessage, error } = useSelector((state) => state.addProfitLossReducer);
    const navigate = useNavigate();

    const handleReload = () => {
        dispatch(resetProfitLossReducer());
    };

    const showError = () => {
      return (
        <Container>
          <Typography variant="h6" color="error">
              Error: {error}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleReload}>
              Reload
          </Button>
      </Container>
      );
    }

    useEffect(() => {
        if (successMessage) {
            alert(successMessage);
            dispatch(resetProfitLossReducer());
            navigate('/home');
        }
        if (error) {
            alert(error);
            showError()
        }
    }, [successMessage, error, dispatch, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(applyProfitLoss({
            tradeCategory: tradeCategory, 
            profitLoss: profitLoss,
            profitLossPercent: percentage
        }));
    };

    // Function to handle category selection
    const handleCategoryChange = (event) => {
        setProfitLoss(event.target.value);
    };

    // Function to handle percentage input
    const handlePercentageChange = (event) => {
        setPercentage(event.target.value);
    };

    const handleTradeCategoryChange = (event) => {
        setTradeCategory(event.target.value);
    };

    return (
        <div className="page-container">
            <div className="form-container">
                <h1>Add Trading Profit/Loss</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="tradeCategory">Profit/Loss:</label>
                        <select id="tradeCategory" name="tradeCategory" value={profitLoss} onChange={handleCategoryChange} required>
                            <option value="">Select category...</option>
                            <option value="PROFIT">Profit</option>
                            <option value="LOSS">Loss</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Trade Category:</label>
                        <select id="category" name="category" value={tradeCategory} onChange={handleTradeCategoryChange} required>
                            <option value="">Select category...</option>
                            <option value="COMMODITY">COMMODITY</option>
                            <option value="FOREX">FOREX</option>  
                            <option value="EQUITY">EQUITY</option>
                            <option value="CRYPTO">CRYPTO</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="percentage">Profit/Loss Percentage:</label>
                        <input type="number" id="percentage" name="percentage" value={percentage} onChange={handlePercentageChange} required />
                    </div>
                    <button type="submit" className="btn">Submit</button>
                </form>
                <Link to="/home" className="btn">Go Back</Link>
            </div>
        </div>
    );
};

export default AddProfitLoss;
